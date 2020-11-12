/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module'

import { config } from '../config'
import { Movie, MovieRating } from '../features/movie/movie.model'

const entities = [Movie, MovieRating]

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      entities,

      database: config.postgres_db,
      username: config.postgres_user,
      password: config.postgres_password,
      host: config.postgres_host,
      port: config.postgres_port,

      ssl: false,
      synchronize: true, // FIXME: disable later
    }),
  ],
})
export class DatabaseModule {}
