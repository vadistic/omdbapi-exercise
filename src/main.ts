import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { Config } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config: ConfigService<Config> = app.get(ConfigService)

  await app.listen(config.get('port'))
}

bootstrap()
