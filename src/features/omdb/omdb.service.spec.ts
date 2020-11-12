import { Test, TestingModule } from '@nestjs/testing'

import { ConfigModule } from '../../config/config.module'

import { OmdbService } from './omdb.service'

describe('OmdbService', () => {
  let service: OmdbService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [OmdbService],
    }).compile()

    service = module.get<OmdbService>(OmdbService)
  })

  it(`should be defined`, () => {
    expect(service).toBeDefined()
  })

  it(`should find 'Kill bill'`, async () => {
    const res = await service.fetchOne({ t: 'Kill Bill' })

    expect(res).toBeDefined()
    expect(res?.Title).toMatch('Kill Bill')
  })
})
