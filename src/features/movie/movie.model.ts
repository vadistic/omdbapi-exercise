import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  Entity,
} from 'typeorm'

export enum MovieType {
  movie = 'movie',
  series = 'series',
  episode = 'episode',
}

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @Column('varchar', { length: 255 })
  title!: string

  @Column('smallint')
  year!: string

  @Column('varchar', { length: 255 })
  rated!: string

  @Column('date')
  released!: Date

  @Column('varchar', { length: 255 })
  runtime!: string

  @Column('varchar', { length: 255, array: true })
  genre!: string[]

  @Column('varchar', { length: 255 })
  director!: string[]

  @Column('varchar', { length: 255 })
  writer!: string[]

  @Column('varchar')
  actors!: string

  @Column('varchar')
  plot!: string

  @Column('varchar', { length: 255, array: true })
  lagnuage!: string[]

  @Column('varchar', { length: 255, array: true })
  country!: string[]

  @Column('varchar')
  awards!: string

  @Column('varchar')
  poster!: string

  @OneToMany(type => MovieRating, rating => rating.movie)
  ratings!: string

  @Column('smallint')
  metascore!: number

  @Column('real')
  imdbRating!: number

  @Column('integer')
  imdbVotes!: number

  @Column('varchar', { length: 255, array: true })
  imdbID!: string

  @Column('varchar', { length: 255 })
  type!: MovieType

  @Column('varchar', { length: 255 })
  dvd!: 'N/A'

  @Column('varchar', { length: 255 })
  boxOffice!: string

  @Column('varchar', { length: 255 })
  production!: string

  @Column('varchar', { length: 255 })
  website!: string
}

@Entity()
export class MovieRating {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(type => Movie, movie => movie.ratings)
  movie!: string

  @Column('varchar', { length: 255 })
  source!: string

  @Column('varchar', { length: 255 })
  value!: string
}
