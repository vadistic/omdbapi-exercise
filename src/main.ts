import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { config } from './config'
import { setupSwagger } from './swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  setupSwagger(app)

  await app.listen(config.port)
}

bootstrap()
