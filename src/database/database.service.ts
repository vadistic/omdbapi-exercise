import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

export interface EntityItem {
  name: string
  tableName: string
}

@Injectable({})
export class DatabaseService {
  constructor(@InjectConnection() readonly connection: Connection) {}

  /**
   * shutdown the http server
   * and close database connections
   */
  async shutdownServer(server: any) {
    await server.httpServer.close()
    await this.closeDbConnection()
  }

  /**
   * closes the database connections
   */
  async closeDbConnection() {
    if (this.connection.isConnected) {
      await this.connection.close()
    }
  }

  /**
   * returns the entites of the database
   */
  getEntities(): EntityItem[] {
    return this.connection.entityMetadatas.map(({ name, tableName }) => ({ name, tableName }))
  }

  /**
   * cleans all the entities
   */
  async cleanTables(entities: EntityItem[]) {
    try {
      for (const entity of entities) {
        const repository = this.connection.getRepository(entity.name)

        await repository.query(`DELETE FROM ${entity.tableName};`)
      }
    } catch (error) {
      throw new InternalServerErrorException(`Failed to clean database: ${error.message}`)
    }
  }
}
