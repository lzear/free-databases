import { desc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/node-postgres'
import { nanoid } from 'nanoid'
import pkg from 'pg'

import { todos } from '../drizzle-schema/postgres'
import { SingletonUnique } from '../singletons'
import { TodoProvider } from '../todo-providers'

const { Pool } = pkg

const drizzleClientSingleton = new SingletonUnique(() => {
  if (
    !process.env.YUGABYTE_POSTGRES_HOST ||
    !process.env.YUGABYTE_POSTGRES_USER ||
    !process.env.YUGABYTE_POSTGRES_CA_CERT ||
    !process.env.YUGABYTE_POSTGRES_PASSWORD
  )
    throw new Error(
      'Missing YUGABYTE_POSTGRES_HOST or YUGABYTE_POSTGRES_USER or YUGABYTE_POSTGRES_PASSWORD or YUGABYTE_POSTGRES_CA_CERT',
    )

  const pool = new Pool({
    host: process.env.YUGABYTE_POSTGRES_HOST,
    user: process.env.YUGABYTE_POSTGRES_USER,
    database: 'yugabyte',
    port: 5433,
    password: process.env.YUGABYTE_POSTGRES_PASSWORD,
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.YUGABYTE_POSTGRES_CA_CERT,
    },
  })
  return drizzle(pool)
})

const drizzleClient = () => drizzleClientSingleton.get()

export const yugabyte = {
  name: 'Yugabyte',
  slug: 'yugabyte',
  isAvailable: Boolean(
    process.env.YUGABYTE_POSTGRES_HOST &&
      process.env.YUGABYTE_POSTGRES_USER &&
      process.env.YUGABYTE_POSTGRES_CA_CERT &&
      process.env.YUGABYTE_POSTGRES_PASSWORD,
  ),
  icon: 'yugabyte.svg',
  description: (
    <p>
      YugabyteDB is an open-source, high-performance, distributed SQL database
      built on a scalable and fault-tolerant design inspired by Google Spanner.
      It supports API compatibility with PostgreSQL and linear scalability,
      making it suitable for a wide range of applications, from mainframe
      migration and microservices to real-time analytics.
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
