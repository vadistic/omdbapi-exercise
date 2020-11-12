# movie db-exercise

## Description

Simple moviedb api as a refresher exercise with nestjs & typeorm

## Development

### Docker

#### Prerequisites

[docker](https://docs.docker.com/engine/install) - containers / local postgres
[dokcer-machine](https://github.com/docker/machine) - dev vm host
[dokcer-compose](https://github.com/docker/compose) - deploying containers to vm

Usign docker is optional, only needed for local dev enviroment

#### Setup

```bash
# 1) create docker-machine host
$ docker-machine create default
# 2) load machine env variables (docker-machine env)
$ eval $(docker-machine env)
# 3) deploy with compose
$ docker-compose up -d
# 4) check vm ip and update .env file DATABASE_HOST variable
$ docker-machine ip
```

### Installation

```bash
yarn install
```

### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## License

Nest is [MIT licensed](LICENSE).
