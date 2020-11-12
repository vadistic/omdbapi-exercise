import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module'

import { Movie, MovieRating } from './movie.model'

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieRating])],
})
export class MovieModule {}
