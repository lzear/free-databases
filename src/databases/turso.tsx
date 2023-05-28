import { Config, createClient } from '@libsql/client'
import { desc, eq } from 'drizzle-orm'
import { drizzle, LibSQLDatabase } from 'drizzle-orm/libsql'
import { nanoid } from 'nanoid'

import { todos } from '../drizzle-schema/sqlite'
import { TodoProvider } from '../todo-providers'

const withDrizzleClient =
  (config: Config) =>
  async <T,>(callback: (d: LibSQLDatabase) => Promise<T>) => {
    const client = createClient(config)
    try {
      return await callback(drizzle(client))
    } finally {
      client.close()
    }
  }

const withD =
  process.env.TURSO_DATABASE_URL && process.env.TURSO_SECRET_TOKEN
    ? withDrizzleClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_SECRET_TOKEN,
      })
    : undefined

export const turso = {
  name: 'Turso',
  slug: 'turso',
  icon: 'turso.svg',
  description: (
    <p>
      Turso is a serverless, edge computing platform that enhances application
      performance globally while prioritizing data security and developer
      experience
    </p>
  ),
  server: withD
    ? {
        create: (name) =>
          withD((d) =>
            d
              .insert(todos)
              .values({
                id: nanoid(),
                name,
                done: 0,
              })
              .run(),
          ),
        getTodos: async (done) =>
          withD(async (d) => {
            const r = await d
              .select()
              .from(todos)
              .where(eq(todos.done, done ? 1 : 0))
              .orderBy(desc(todos.createdAt))
              .all()
            return r.map((t) => ({
              ...t,
              done: Boolean(t.done),
              createdAt: new Date(t.createdAt),
              updatedAt: new Date(t.updatedAt),
            }))
          }),
        setDone: (id, done) =>
          withD((d) =>
            d
              .update(todos)
              .set({ done: done ? 1 : 0 })
              .where(eq(todos.id, id))
              .run(),
          ),
        rename: (id, name) =>
          withD((d) =>
            d.update(todos).set({ name }).where(eq(todos.id, id)).run(),
          ),
        deleteForever: (id) =>
          withD((d) => d.delete(todos).where(eq(todos.id, id)).run()),
      }
    : undefined,
} satisfies TodoProvider
