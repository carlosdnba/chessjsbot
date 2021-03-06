# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.0](https://github.com/carlosdnba/chessjsbot/compare/v1.0.0...v2.0.0) (2022-01-29)


### Features

* add local chess.js lib because installed one is missing some functions required by AI ([d1a45f2](https://github.com/carlosdnba/chessjsbot/commit/d1a45f2998ee10c44affde9f354023e24c26cd5f))
* **commands:** add help and readme commands ([3f01091](https://github.com/carlosdnba/chessjsbot/commit/3f01091d5ddd112f9ff6cb05a83ee3aefd65b427))
* **commands:** improve /start message ([7003738](https://github.com/carlosdnba/chessjsbot/commit/70037381e2bfec26162fef78199e22cda326af8c))
* **ddb:** verify if user exists before saving and save `startedAt` attribute ([43dac3a](https://github.com/carlosdnba/chessjsbot/commit/43dac3a63a5d296940a7440c92b47782c5fc0790))
* get bot move from chess-ai ([1c1114e](https://github.com/carlosdnba/chessjsbot/commit/1c1114edc3082055e1b0f0cc0b223fdc226b36bd))
* **logs:** set debug logs to improve metrics ([8f4a771](https://github.com/carlosdnba/chessjsbot/commit/8f4a771ace63638f1f63f99f778290713272c72a))
* **performance:** get rid of ssm ([33db61f](https://github.com/carlosdnba/chessjsbot/commit/33db61f7744bff8b5efb06e3c70ed9560a52fc07))
* set chess.js as a local lib ([83286ad](https://github.com/carlosdnba/chessjsbot/commit/83286ad46dd188771656b77b406ed4274122c548))


### Bug Fixes

* **build:** remove ˆ ([2251ccf](https://github.com/carlosdnba/chessjsbot/commit/2251ccf722af9202a0389bb53920309a8df5e640))
* **ci:** change node v ([2e8a785](https://github.com/carlosdnba/chessjsbot/commit/2e8a785f0e6637fe42399054efdd75478c2ed6f5))

## 1.0.0 (2022-01-28)


### ⚠ BREAKING CHANGES

* **game:** store game as finished and improve some logical

### Features

* **ddb:** store game status ([dcba10f](https://github.com/carlosdnba/chessjsbot/commit/dcba10f01a5d5d80c06873931a612b71051aa69c))
* **deps:** add chess.js ([993f9ae](https://github.com/carlosdnba/chessjsbot/commit/993f9ae9433e71168a03b2523b5956b1462e9bae))
* **game:** finish game flow covering game overs ([b9ab1c8](https://github.com/carlosdnba/chessjsbot/commit/b9ab1c830b0b72092204a539bf06ed23af1ef1b5))
* **game:** start game with simple validation ([c48c8d6](https://github.com/carlosdnba/chessjsbot/commit/c48c8d657ddb3583e0baadbc149f6cd7e0c337a7))
* **game:** store game as finished and improve some logical ([5a0af3b](https://github.com/carlosdnba/chessjsbot/commit/5a0af3bf3723179d98392b7f96d9189ed7eaac8a))


### Bug Fixes

* **ddb:** store game status before game id on sk ([c24bbdd](https://github.com/carlosdnba/chessjsbot/commit/c24bbddf32a5f104f774583a5e8284ce4ac29990))
* set telegram to send messages back to the received chatId ([517cfee](https://github.com/carlosdnba/chessjsbot/commit/517cfee1504ad843613d0f0f4111edd3ff09f265))
* typo ([64fa715](https://github.com/carlosdnba/chessjsbot/commit/64fa7151d79fd2b44cb4009dad305a2a30eaaf8c))
