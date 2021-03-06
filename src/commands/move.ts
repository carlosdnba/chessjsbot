import { ChessInstance } from '../types/chess'
import { Chess } from '../lib/chess'
import { Payload } from '../types/payload'
import { sendMessage } from '../services'
import { buildBoardMessage, getCommandAndText } from '../utils'
import { debug } from '../core'
import { gameRunningByPlayerId, movesByGameId } from '../db/queries'
import { storeMove, finishGame } from '../db/functions'
import { makeBestMove } from '../lib/chess-ai'

const getGameOverReason = (game: ChessInstance) => {
  const winner = game.turn() === 'w' ? 'Black' : 'White'

  if (game.in_checkmate()) return { winner, reason: 'Checkmate!' }
  if (game.in_stalemate()) return { winner: 'draw', reason: 'Stalemate!' }
  if (game.in_threefold_repetition()) return { winner: 'draw', reason: 'Draw by repetition!' }
  return { winner: 'draw', reason: 'Draw!' }
}

const endGame = async (game: ChessInstance, gameId: string, playerId: string) => {
  const { winner, reason } = getGameOverReason(game)
  await finishGame({ gameId, winner, reason, game, whitePlayer: { id: playerId }, blackPlayer: { id: 'bot' } })
  await sendMessage(`${reason}\nThe winner is: **${winner}**`, playerId)
}

const messages = {
  noMove: 'Please, type in a valid move like `/move e6`.',
  invalidMove: (move: string) => `The move \`${move}\` is not allowed.\nTry the command \`/availablemoves\` to check on what you could do.`,
  noGameRunning: 'There is no game running. You can start a new one with `/newgamebot`.',
  board: (game: ChessInstance, moveNumber: number, move: string) => {
    const player = game.turn() === 'w' ? 'Black' : 'White'
    return `Move ${moveNumber}: \`${move}\` (${player})\n\n${buildBoardMessage(game.ascii())}`
  }
}

export default async (payload: Payload): Promise<void> => {
  const { id } = payload.message.chat

  // Verify if a game is already running
  const isGameRunning = await gameRunningByPlayerId(id)
  if (!isGameRunning) return sendMessage(messages.noGameRunning, id)

  // Player's turn
  const { gameId } = isGameRunning
  const { text: move } = getCommandAndText(payload.message.text)

  if (!move) return sendMessage(messages.noMove, id)

  const allMoves = await movesByGameId(gameId)
  const qtdMoves = allMoves.length

  const game = Chess()

  if (qtdMoves > 0) {
    // Loading all the previous moves
    allMoves.sort((a, b) => a.moveIdx - b.moveIdx).forEach(({ move }) => game.move(move))
    debug('commands:move')('game history %o', game.history({ verbose: true }))
  }

  // Check if move is valid
  if (!game.moves().includes(move)) {
    debug('commands:move')('move %o availableMoves %o', move, game.moves())
    return sendMessage(messages.invalidMove(move), id)
  }

  game.move(move)
  await storeMove({ gameId, playerId: id, move, moveIdx: qtdMoves + 1, board: game.fen() })
  await sendMessage(messages.board(game, qtdMoves + 1, move), id)

  if (game.game_over()) return endGame(game, gameId, id)
  if (game.in_check()) await sendMessage('Check!', id)

  // Bot's turn
  // const botMove = choseRandomMove(game.moves())
  const { move: botMove } = makeBestMove({ game, previousSum: 0 })
  console.log(botMove)

  game.move(botMove)
  await storeMove({ gameId, playerId: 'bot', move: botMove, moveIdx: qtdMoves + 2, board: game.fen() })
  await sendMessage(messages.board(game, qtdMoves + 2, botMove), id)

  if (game.game_over()) return endGame(game, gameId, id)
  if (game.in_check()) await sendMessage('Check!', id)
}
