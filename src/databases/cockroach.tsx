import { desc, eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import { nanoid } from 'nanoid'
import postgres from 'postgres'

import { todos } from '../drizzle-schema/postgres'
import { SingletonUnique } from '../singletons'
import { TodoProvider } from '../todo-providers'
import { pgImplementation } from '../with-pg'

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
  icon: 'cockroach.svg',
  description: (
    <p>
      CockroachDB is an open-source, distributed SQL database that is designed
      to store copies of data in multiple locations in order to deliver speedy
      access. Its key features include horizontal scaling, strong consistency,
      and survivability, hence the name &ldquo;Cockroach&rdquo;.
    </p>
  ),
  server: pgImplementation(process.env.COCKROACH_POSTGRES_URL),
} satisfies TodoProvider
