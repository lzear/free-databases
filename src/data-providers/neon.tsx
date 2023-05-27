import { desc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import { nanoid } from 'nanoid'
import postgres from 'postgres'

import { SingletonUnique } from '../singletons'
import { todos } from './drizzle/postgres'
import { TodoProvider } from './todo-providers'

const drizzleClientSingleton = new SingletonUnique(() => {
  if (!process.env.NEON_POSTGRES_URL)
    throw new Error('Missing NEON_POSTGRES_URL')

  // for query purposes
  const queryClient = postgres(process.env.NEON_POSTGRES_URL)
  return drizzle(queryClient)
})

const drizzleClient = () => drizzleClientSingleton.get()

export const neon = {
  name: 'Neon',
  slug: 'neon',
  isAvailable: Boolean(process.env.NEON_POSTGRES_URL),
  icon: 'neon.svg',
  description: (
    <p>
      Neon is a serverless open-source alternative to AWS Aurora Postgres. It
      separates storage and compute and substitutes the PostgreSQL storage layer
      by redistributing data across a cluster of nodes.
    </p>
  ),
  create: (name) =>
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
