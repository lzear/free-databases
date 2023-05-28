import { createPool, sql } from '@vercel/postgres'
import { desc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { nanoid } from 'nanoid'

import { todos } from '../drizzle-schema/postgres'
import { SingletonUnique } from '../singletons'
import { TodoProvider } from '../todo-providers'

const drizzleClientSingleton = new SingletonUnique(() =>
  drizzle(
    createPool({
      connectionString: process.env.VERCEL_POSTGRES_URL,
    }),
  ),
)

const drizzleClient = () => drizzleClientSingleton.get()

export const vercel = {
  name: 'Vercel Postgres',
  slug: 'vercel',
  isAvailable: Boolean(process.env.VERCEL_POSTGRES_URL),
  icon: 'vercel.svg',
  description: (
    <p>
      Vercel Postgres is a serverless SQL database designed to integrate with
      Vercel Functions and your frontend framework.
    </p>
  ),
  create: async (name) =>
    drizzleClient().insert(todos).values({
      id: nanoid(),
      name,
      done: false,
    }),
  getTodos: async (done) =>
    drizzleClient()
      .select()
      .from(todos)
      .where(eq(todos.done, done))
      .orderBy(desc(todos.createdAt)),
  setDone: (id, done) =>
    drizzleClient().update(todos).set({ done }).where(eq(todos.id, id)),
  rename: (id, name) =>
    drizzleClient().update(todos).set({ name }).where(eq(todos.id, id)),
  deleteForever: (id) => drizzleClient().delete(todos).where(eq(todos.id, id)),
} satisfies TodoProvider
