import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { MovieModule } from './features/movie/movie.module'

@Module({
  imports: [DatabaseModule, DatabaseModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
