import { desc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import { nanoid } from 'nanoid'
import postgres from 'postgres'

import { SingletonUnique } from '../singletons'
import { todos } from './drizzle/postgres'
import { TodoProvider } from './todo-providers'

const drizzleClientSingleton = new SingletonUnique(() => {
  if (!process.env.ELEPHANT_POSTGRES_URL)
    throw new Error('Missing ELEPHANT_POSTGRES_URL')
  const queryClient = postgres(process.env.ELEPHANT_POSTGRES_URL)
  return drizzle(queryClient)
})

const drizzleClient = () => drizzleClientSingleton.get()

export const elephant = {
  name: 'ElephantSQL',
  slug: 'elephant',
  isAvailable: Boolean(process.env.ELEPHANT_POSTGRES_URL),
  icon: 'elephantsql.png',
  description: (
    <p>
      ElephantSQL is a fully-managed PostgreSQL database hosting service. It
      handles administrative tasks, provides automated backups, performance
      metrics, and enables easy scaling, all with high security and various
      plans including a free tier.
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
