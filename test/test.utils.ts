import { Module } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import fs from 'fs'
import Path from 'path'
import { Connection } from 'typeorm'

export interface EntityItem {
  name: string
  tableName: string
}

/**
 * This class is used to support database
 * tests with unit tests in NestJS.
 *
 * inspiration: https://github.com/nestjs/nest/issues/409
 */
@Module({})
export class TestUtilsModule {
  constructor(@InjectConnection() readonly connection: Connection) {
    // if (process.env.NODE_ENV !== 'test') {
    //   throw new Error('ERROR-TEST-UTILS-ONLY-FOR-TESTS')
    // }
  }

  /**
   * Shutdown the http server
   * and close database connections
   */
  async shutdownServer(server: any) {
    await server.httpServer.close()
    await this.closeDbConnection()
  }

  /**
   * Closes the database connections
   */
  async closeDbConnection() {
    if (this.connection.isConnected) {
      await this.connection.close()
    }
  }

  /**
   * Returns the entites of the database
   */
  getEntities(): EntityItem[] {
    return this.connection.entityMetadatas.map(({ name, tableName }) => ({ name, tableName }))
  }

  async reloadFixtures() {
    const entities = this.getEntities()

    await this.cleanAll(entities)
    await this.loadAll(entities)
  }

  /**
   * Cleans all the entities
   */
  async cleanAll(entities: EntityItem[]) {
    try {
      for (const entity of entities) {
        const repository = this.connection.getRepository(entity.name)

        await repository.query(`DELETE FROM ${entity.tableName};`)
      }
    } catch (error) {
      throw new Error(`[TestUtils.cleanAll()] test db: ${error}`)
    }
  }

  /**
   * Insert the data from the src/test/fixtures folder
   */
  async loadAll(entities: EntityItem[]) {
    try {
      for (const entity of entities) {
        const repository = this.connection.getRepository(entity.name)

        const fixtureFile = Path.join(__dirname, `../test/fixtures/${entity.name}.json`)

        if (fs.existsSync(fixtureFile)) {
          const items = JSON.parse(fs.readFileSync(fixtureFile, 'utf8'))
          await repository.createQueryBuilder(entity.name).insert().values(items).execute()
        }
      }
    } catch (error) {
      throw new Error(`[TestUtils.loadAll()] loading fixtures on test db: ${error}`)
    }
  }
}
