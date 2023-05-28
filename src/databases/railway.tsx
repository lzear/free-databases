import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { SingletonUnique } from '../singletons'
import { TodoProvider } from '../todo-providers'
import { pgImplementation } from '../with-pg'

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
  server: pgImplementation(process.env.RAILWAY_DATABASE_URL),
  icon: 'railway.svg',
  description: (
    <p>
      Railway is an infrastructure platform where you can provision
      infrastructure, develop with that infrastructure locally, and then deploy
      to the cloud.
    </p>
  ),
} satisfies TodoProvider
