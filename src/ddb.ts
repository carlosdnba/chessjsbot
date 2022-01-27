import { debug } from './core'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { DynamoDBClient, PutItemCommand, BatchWriteItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({})
const TABLE_NAME = process.env.TABLE_NAME

interface DdbItem {
  pk?: string
  sk?: string
  [key: string]: any
}

interface QueryParams {
  pk: string
  sk: string
  attributes?: string[]
}

// Adding ddb services
export const PutItem = (item: DdbItem) => client.send(new PutItemCommand({
  TableName: TABLE_NAME,
  Item: marshall(item)
}))

export const BatchWriteItems = (items: DdbItem[]) => client.send(new BatchWriteItemCommand({
  RequestItems: {
    [TABLE_NAME]: items.map(item => ({
      PutRequest: {
        Item: marshall(item)
      }
    }))
  }
}))

export const Query = async ({ pk, sk, attributes }: QueryParams): Promise<DdbItem[]> => {
  debug('ddb:Query')('pk %o sk %o attributes %o', pk, sk, attributes)

  const query = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
    ExpressionAttributeValues: marshall({ ':pk': pk, ':sk': sk }),
    ProjectionExpression: attributes
      ? attributes.map(attr => `#${attr}`).join(', ')
      : undefined,
    ExpressionAttributeNames: attributes
      ? attributes.reduce((acc, attr) => ({ ...acc, [`#${attr}`]: attr }), {})
      : undefined
  }

  const { Items = [] } = await client.send(new QueryCommand(query))
  debug('ddb:Query')('Items.length %o', Items.length)

  return Items.map(item => unmarshall(item))
}
