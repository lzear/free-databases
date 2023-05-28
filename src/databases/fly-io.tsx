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
    !process.env.FLYIO_POSTGRES_HOST ||
    !process.env.FLYIO_POSTGRES_USER ||
    !process.env.FLYIO_POSTGRES_PASSWORD
  )
    throw new Error(
      'Missing FLYIO_POSTGRES_HOST or FLYIO_POSTGRES_USER or FLYIO_POSTGRES_PASSWORD',
    )

  const pool = new Pool({
    host: process.env.FLYIO_POSTGRES_HOST,
    user: process.env.FLYIO_POSTGRES_USER,
    password: process.env.FLYIO_POSTGRES_PASSWORD,
  })
  return drizzle(pool)
})

const drizzleClient = () => drizzleClientSingleton.get()

export const flyio = {
  name: 'Fly.io',
  slug: 'fly-io',
  isAvailable: Boolean(
    process.env.FLYIO_POSTGRES_HOST &&
      process.env.FLYIO_POSTGRES_USER &&
      process.env.FLYIO_POSTGRES_PASSWORD,
  ),
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
