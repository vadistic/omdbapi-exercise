import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module'

import { OmdbModule } from '../omdb/omdb.module'

import { MovieController } from './movie.controller'
import { MovieEntity } from './movie.entity'
import { MovieService } from './movie.service'

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), OmdbModule],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
