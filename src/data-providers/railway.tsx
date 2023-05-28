import { desc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import { nanoid } from 'nanoid'
import postgres from 'postgres'

import { todos } from '../drizzle-schema/postgres'
import { SingletonUnique } from '../singletons'
import { TodoProvider } from '../todo-providers'

const drizzleClientSingleton = new SingletonUnique(() => {
  if (!process.env.RAILWAY_DATABASE_URL)
    throw new Error('Missing RAILWAY_DATABASE_URL')

  // for query purposes
  const queryClient = postgres(process.env.RAILWAY_DATABASE_URL)
  return drizzle(queryClient)
})

const drizzleClient = () => drizzleClientSingleton.get()

export const railway = {
  name: 'Railway',
  slug: 'railway',
  isAvailable: Boolean(process.env.RAILWAY_DATABASE_URL),
  icon: 'railway.svg',
  description: (
    <p>
      Railway is an infrastructure platform where you can provision
      infrastructure, develop with that infrastructure locally, and then deploy
      to the cloud.
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
