import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum MovieType {
  movie = 'movie',
  series = 'series',
  episode = 'episode',
}

export class RatingData {
  source!: string

  value!: string
}

export class MovieData {
  @Index({ unique: true })
  @Column('varchar', { length: 255 })
  @ApiProperty({
    type: String,
    example: 'Kill Bill',
  })
  title!: string

  @Column('smallint')
  year!: number

  @Column('varchar', { length: 255 })
  type!: MovieType

  @Column({
    type: 'json',
    array: false,
    default: [],
  })
  ratings: RatingData[] = []

  // --- collection below

  @Column('varchar', { length: 255, array: true })
  language!: string[]

  @Column('varchar', { length: 255, array: true })
  country!: string[]

  @Column('varchar', { length: 255, array: true })
  genre!: string[]

  // --- nullable below - it's hard to say what's the data in edge cases

  @Column('varchar', { length: 255, nullable: true })
  rated?: string

  @Column('date', { nullable: true })
  released?: Date

  @Column('varchar', { length: 255, nullable: true })
  runtime?: string

  @Column('varchar', { length: 255, nullable: true })
  director?: string

  @Column('varchar', { length: 255, nullable: true })
  writer?: string

  @Column('varchar', { nullable: true })
  actors?: string

  @Column('varchar', { nullable: true })
  plot?: string

  @Column('varchar', { nullable: true })
  awards?: string

  @Column('varchar', { nullable: true })
  poster?: string

  @Column('smallint', { nullable: true })
  metascore?: number

  @Column('real', { name: 'imdb_rating', nullable: true })
  imdbRating?: number

  @Column('integer', { name: 'imdb_votes', nullable: true })
  imdbVotes?: number

  // https://github.com/typeorm/typeorm/issues/4859
  @Index({ unique: true, where: 'imdb_id IS NOT NULL' })
  @Column('varchar', { name: 'imdb_id', length: 255, nullable: true })
  imdbID?: string

  @Column('varchar', { length: 255, nullable: true })
  dvd?: string

  @Column('varchar', { name: 'box_office', length: 255, nullable: true })
  boxOffice?: string

  @Column('varchar', { length: 255, nullable: true })
  production?: string

  @Column('varchar', { length: 255, nullable: true })
  website?: string
}

@Entity({ name: 'movie' })
export class MovieEntity extends MovieData {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date
}
