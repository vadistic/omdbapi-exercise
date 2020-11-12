import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module'

@Module({
  imports: [TypeOrmModule.forRoot({})],
})
export class DatabaseModule {}
