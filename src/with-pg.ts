import { desc, eq } from 'drizzle-orm'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { nanoid } from 'nanoid'
import pkg, { ClientConfig, PoolConfig } from 'pg'

import { todos } from './drizzle-schema/postgres'
import { ServerImplementation } from './todos-server/type'

const { Client, Pool } = pkg

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

export const withPgPool =
  (config: PoolConfig) =>
  async <T>(callback: (nodePgDatabase: NodePgDatabase) => Promise<T>) => {
    const pool = new Pool(config)
    const client = await pool.connect()
    try {
      const database = drizzle(client)
      return await callback(database)
    } finally {
      await client.release()
      await pool.end()
    }
  }

export const pgPoolImplementation = (config?: PoolConfig) => {
  if (!config) return
  return {
    create: (name: string) =>
      withPgPool(config)((database) =>
        database.insert(todos).values({
          id: nanoid(),
          name,
          done: false,
        }),
      ),
    getTodos: (done) =>
      withPgPool(config)((database) =>
        database
          .select()
          .from(todos)
          .where(eq(todos.done, done))
          .orderBy(desc(todos.createdAt)),
      ),
    setDone: (id, done) =>
      withPgPool(config)((database) =>
        database.update(todos).set({ done }).where(eq(todos.id, id)),
      ),
    rename: (id, name) =>
      withPgPool(config)((database) =>
        database.update(todos).set({ name }).where(eq(todos.id, id)),
      ),
    deleteForever: (id) =>
      withPgPool(config)((database) =>
        database.delete(todos).where(eq(todos.id, id)),
      ),
  } satisfies ServerImplementation
}
