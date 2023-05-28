import { desc, eq } from 'drizzle-orm'
import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2'
import { type ConnectionOptions, createConnection } from 'mysql2'
import { nanoid } from 'nanoid'

import { todos } from './drizzle-schema/mysql'
import { ServerImplementation } from './todos-server/type'

export const withMysql =
  (config: ConnectionOptions) =>
  async <T>(callback: (nodePgDatabase: MySql2Database) => Promise<T>) => {
    const client = createConnection(config)
    try {
      await client.connect()
      const database = drizzle(client)
      return await callback(database)
    } finally {
      await client.end()
    }
  }

export const mysqlImplementation = (config?: ConnectionOptions) => {
  if (!config) return
  return {
    create: (name: string) =>
      withMysql(config)((database) =>
        database.insert(todos).values({
          id: nanoid(),
          name,
          done: false,
        }),
      ),
    getTodos: (done) =>
      withMysql(config)((database) =>
        database
          .select()
          .from(todos)
          .where(eq(todos.done, done))
          .orderBy(desc(todos.createdAt)),
      ),
    setDone: (id, done) =>
      withMysql(config)((database) =>
        database.update(todos).set({ done }).where(eq(todos.id, id)),
      ),
    rename: (id, name) =>
      withMysql(config)((database) =>
        database.update(todos).set({ name }).where(eq(todos.id, id)),
      ),
    deleteForever: (id) =>
      withMysql(config)((database) =>
        database.delete(todos).where(eq(todos.id, id)),
      ),
  } satisfies ServerImplementation
}
