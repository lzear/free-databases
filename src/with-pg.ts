import { desc, eq } from 'drizzle-orm'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { PgDatabase } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'
import pkg, { ClientConfig, PoolConfig } from 'pg'

import { todos } from './drizzle-schema/postgres'
import { ServerImplementation } from './todos-server/type'

const { Client } = pkg

export const withPg =
  (config: string | ClientConfig) =>
  async <T>(callback: (nodePgDatabase: NodePgDatabase) => Promise<T>) => {
    const client = new Client(config)
    try {
      await client.connect()
      const database = drizzle(client)
      return await callback(database)
    } finally {
      await client.end()
    }
  }

export const pgImplementation = (config?: string | ClientConfig) => {
  if (!config) return
  return {
    create: (name: string) =>
      withPg(config)((database) =>
        database.insert(todos).values({
          id: nanoid(),
          name,
          done: false,
        }),
      ),
    getTodos: (done) =>
      withPg(config)((database) =>
        database
          .select()
          .from(todos)
          .where(eq(todos.done, done))
          .orderBy(desc(todos.createdAt)),
      ),
    setDone: (id, done) =>
      withPg(config)((database) =>
        database.update(todos).set({ done }).where(eq(todos.id, id)),
      ),
    rename: (id, name) =>
      withPg(config)((database) =>
        database.update(todos).set({ name }).where(eq(todos.id, id)),
      ),
    deleteForever: (id) =>
      withPg(config)((database) =>
        database.delete(todos).where(eq(todos.id, id)),
      ),
  } satisfies ServerImplementation
}
