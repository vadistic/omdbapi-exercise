/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module'

import { config } from '../config'
import { MovieEntity } from '../features/movie/movie.entity'

const entities = [MovieEntity]

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

      logging: config.dev,
      // FIXME: disable later
      // synchronize: true,
      // dropSchema: true,
    }),
  ],
})
export class DatabaseModule {}
