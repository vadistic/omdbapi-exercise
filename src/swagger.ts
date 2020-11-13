import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { config } from './config'

export const setupSwagger = (app: INestApplication) => {
  const url = config.dev ? 'http' : 'https'

  const options = new DocumentBuilder()
    .setTitle('OMDB API Database')
    .setDescription('Simple moviedb api as a refresher exercise with nestjs & typeorm')
    .setVersion('0.1.0')
    .addTag('Endpoints')
    .setContact('Jakub Wadas', 'https://vadistic.netlify.app', 'vadistic@gmail.com')
    .addServer(`${url}://`)
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('api', app, document)
}
