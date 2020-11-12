import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import qs from 'querystring'

import { Config } from '../../config/config'

import { OmdbSearchManyDto, OmdbSearchOneDto } from './omdb.dto'
import { OmdbMovie, OmdbMoviesList, OmdbNotFound } from './omdb.interfaces'

@Injectable()
export class OmdbService {
  constructor(readonly config: ConfigService<Config>) {}

  fetcher = axios.create({
    baseURL: `http://www.omdbapi.com/`,
    params: {
      apikey: this.config.get('omdb_key'),
      r: 'json',
    },
    timeout: 5000,
    responseType: 'json',
    paramsSerializer: params => {
      return qs.stringify(params)
    },
  })

  async fetchOne(params: OmdbSearchOneDto): Promise<OmdbMovie | undefined> {
    const res = await this.fetcher.get<OmdbMovie | OmdbNotFound>('/', {
      params,
      timeout: 2000,
      responseType: 'json',
    })

    if (res.status === 200 && res.data && res.data.Response === 'True') {
      return res.data
    }

    return undefined
  }

  async fetchMany(params: OmdbSearchManyDto): Promise<OmdbMoviesList | undefined> {
    const res = await this.fetcher.get<OmdbMoviesList | OmdbNotFound>('/', {
      params,
      timeout: 2000,
      responseType: 'json',
    })

    if (
      res.status === 200 &&
      res.data &&
      res.data.Response === 'True' &&
      res.data.Search.length > 0
    ) {
      return res.data
    }

    return undefined
  }
}
