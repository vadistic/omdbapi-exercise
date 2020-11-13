import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsString, MaxLength, MinLength } from 'class-validator'

import { PaginationQueryDto } from '../../common/pagination'

import { MovieData } from './movie.entity'

export class GetMoviesQueryDto extends PaginationQueryDto {
  @MaxLength(255)
  @MinLength(2)
  @IsString()
  @ApiProperty({
    type: String,
    maxLength: 255,
    minLength: 2,
    example: 'Kill Bill',
    required: false,
  })
  title?: string
}

export class PostMovieData extends PartialType(MovieData) {}
