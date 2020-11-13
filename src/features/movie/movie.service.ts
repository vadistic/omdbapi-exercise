import { ForbiddenException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { buildWhere } from '../../common/search'
import { mergeDefined } from '../../common/utils'
import { OmdbService } from '../omdb/omdb.service'

import { GetMoviesQueryDto, PostMovieData } from './movie.dto'
import { MovieEntity } from './movie.entity'

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity) readonly movieRepo: Repository<MovieEntity>,
    readonly omdbService: OmdbService,
  ) {}

  async getMovies({ limit, offset, ...search }: GetMoviesQueryDto): Promise<MovieEntity[]> {
    const movies = await this.movieRepo.find({
      take: limit,
      skip: offset,
      order: { createdAt: 'ASC' },
      where: buildWhere(search),
    })

    console.log('movies: ', movies)

    return movies
  }

  async postMovie(data: PostMovieData): Promise<MovieEntity | undefined> {
    const omdbMovie = await this.omdbService.getMovie({
      plot: 'short',
      i: data.imdbID,
      t: data.title,
      type: data.type,
    })

    if (!omdbMovie) {
      throw new ForbiddenException('Movie not found on IMDB')
    }

    const prev = await this.movieRepo.findOne({
      where: { imdbID: omdbMovie.imdbID },
      select: ['id'],
    })

    if (prev) {
      throw new ForbiddenException('Movie already present')
    }

    const entity = this.movieRepo.create(mergeDefined(omdbMovie, data))

    return this.movieRepo.save(entity)
  }
}
