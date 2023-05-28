import { createClient } from '@libsql/client'
import { desc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/libsql'
import { nanoid } from 'nanoid'

import { todos } from '../drizzle-schema/sqlite'
import { SingletonUnique } from '../singletons'
import { TodoProvider } from '../todo-providers'

const drizzleClientSingleton = new SingletonUnique(() => {
  if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_SECRET_TOKEN)
    throw new Error('Missing TURSO_DATABASE_URL or TURSO_SECRET_TOKEN')

  return drizzle(
    createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_SECRET_TOKEN,
    }),
  )
})

const drizzleClient = () => drizzleClientSingleton.get()

export const turso = {
  name: 'Turso',
  slug: 'turso',
  isAvailable: Boolean(
    process.env.TURSO_DATABASE_URL && process.env.TURSO_SECRET_TOKEN,
  ),
  icon: 'turso.svg',
  description: (
    <p>
      Turso is a serverless, edge computing platform that enhances application
      performance globally while prioritizing data security and developer
      experience
    </p>
  ),
  create: async (name) =>
    drizzleClient()
      .insert(todos)
      .values({
        id: nanoid(),
        name,
        done: 0,
      })
      .run(),
  getTodos: async (done) => {
    const r = await drizzleClient()
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
  },
  setDone: (id, done) =>
    drizzleClient()
      .update(todos)
      .set({ done: done ? 1 : 0 })
      .where(eq(todos.id, id))
      .run(),
  rename: (id, name) =>
    drizzleClient().update(todos).set({ name }).where(eq(todos.id, id)).run(),
  deleteForever: (id) =>
    drizzleClient().delete(todos).where(eq(todos.id, id)).run(),
} satisfies TodoProvider
