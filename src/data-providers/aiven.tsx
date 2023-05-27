import { desc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import { nanoid } from 'nanoid'
import postgres from 'postgres'

import { SingletonUnique } from '../singletons'
import { todos } from './drizzle/postgres'
import { TodoProvider } from './todo-providers'

const drizzleClientSingleton = new SingletonUnique(() => {
  if (!process.env.AIVEN_DATABASE_URL)
    throw new Error('Missing AIVEN_DATABASE_URL')

  // for query purposes
  const queryClient = postgres(process.env.AIVEN_DATABASE_URL)
  return drizzle(queryClient)
})

const drizzleClient = () => drizzleClientSingleton.get()

export const aiven = {
  name: 'Aiven',
  slug: 'aiven',
  isAvailable: Boolean(process.env.AIVEN_DATABASE_URL),
  icon: 'aiven.svg',
  description: (
    <p>
      Aiven.io is a managed cloud services provider offering cloud database and messaging services, including Apache
      Kafka, PostgreSQL, MySQL, Elasticsearch, among others, across several major cloud platforms. Its services
      encompass automated backups, failover/redundancy, monitoring, and more.
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
    drizzleClient().update(todos).set({done}).where(eq(todos.id, id)),
  rename: (id, name) =>
    drizzleClient().update(todos).set({name}).where(eq(todos.id, id)),
  deleteForever: (id) => drizzleClient().delete(todos).where(eq(todos.id, id)),
} satisfies TodoProvider
