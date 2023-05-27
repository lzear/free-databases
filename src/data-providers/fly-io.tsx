import { desc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import { nanoid } from 'nanoid'
import postgres from 'postgres'

import { SingletonUnique } from '../singletons'
import { todos } from './drizzle'
import { TodoProvider } from './todo-providers'

const drizzleClientSingleton = new SingletonUnique(() => {
  if (!process.env.FLYIO_DATABASE_URL)
    throw new Error('Missing FLYIO_DATABASE_URL')

  // for query purposes
  const queryClient = postgres(process.env.FLYIO_DATABASE_URL)
  return drizzle(queryClient)
})

const drizzleClient = () => drizzleClientSingleton.get()

export const flyio = {
  name: 'Fly.io',
  slug: 'fly-io',
  isAvailable: Boolean(process.env.FLYIO_DATABASE_URL),
  icon: 'fly-io.webp',
  description: (
    <p>
      Fly.io is a developer-friendly hosting service that deploys applications
      globally for faster performance and lower latency. It supports automatic
      SSL, custom domains, and scalable infrastructure.
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
