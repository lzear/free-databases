import { desc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import { nanoid } from 'nanoid'
import postgres from 'postgres'

import { SingletonUnique } from '../singletons'
import { todos } from './drizzle/postgres'
import { TodoProvider } from './todo-providers'

const drizzleClientSingleton = new SingletonUnique(() => {
  if (!process.env.COCKROACH_POSTGRES_URL)
    throw new Error('Missing COCKROACH_POSTGRES_URL')

  // for query purposes
  const queryClient = postgres(process.env.COCKROACH_POSTGRES_URL)
  return drizzle(queryClient)
})

const drizzleClient = () => drizzleClientSingleton.get()

export const cockroach = {
  name: 'CockroachDB',
  slug: 'cockroach',
  isAvailable: Boolean(process.env.COCKROACH_POSTGRES_URL),
  icon: 'cockroach.svg',
  description: (
    <p>
      CockroachDB is an open-source, distributed SQL database that is designed
      to store copies of data in multiple locations in order to deliver speedy
      access. Its key features include horizontal scaling, strong consistency,
      and survivability, hence the name &ldquo;Cockroach&rdquo;.
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
