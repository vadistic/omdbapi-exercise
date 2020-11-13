import { Body, Controller, Get, NotFoundException, Query, Post } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger'

import { NotFoundResponse } from '../../common/responses'

import { GetMoviesQueryDto, PostMovieData } from './movie.dto'
import { MovieEntity } from './movie.entity'
import { MovieService } from './movie.service'

@Controller('/api/movies')
export class MovieController {
  constructor(readonly movieService: MovieService) {}

  @Get()
  @ApiOkResponse({
    type: MovieEntity,
    isArray: true,
  })
  async getMovies(@Query() query: GetMoviesQueryDto): Promise<MovieEntity[]> {
    return this.movieService.getMovies(query)
  }

  @Post()
  @ApiOkResponse({
    type: MovieEntity,
  })
  @ApiNotFoundResponse({
    type: NotFoundResponse,
  })
  async postMovie(@Body() data: PostMovieData): Promise<MovieEntity> {
    const movie = await this.movieService.postMovie(data)

    if (!movie) {
      throw new NotFoundException('Movie not found')
    }

    return movie
  }
}
