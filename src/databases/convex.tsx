import { ConvexHttpClient } from 'convex/browser'

import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import type { TodoProvider } from '../todo-providers'

if (!process.env.NEXT_PUBLIC_CONVEX_URL) throw new Error('Missing Convex URL')
const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export const convex = {
  name: 'Convex',
  slug: 'convex',
  icon: 'convex.svg',
  description: (
    <p>
      Convex.dev is a serverless infrastructure company offering a reactive
      backend-as-a-service platform with global state management capabilities
      for simplified and scalable web development.
    </p>
  ),
  server: {
    create: (name) => client.mutation(api.todos.insert, { name }),
    getTodos: async (done) => {
      const d = await client.query(api.todos.get, { done })
      return d.map(({ _id, _creationTime, ...rest }) => ({
        ...rest,
        id: _id,
        createdAt: new Date(_creationTime),
        updatedAt: new Date(rest.updatedAt),
      }))
    },
    setDone: (id, done) =>
      client.mutation(api.todos.patch, { id: id as Id<'todos'>, done }),
    rename: (id, name) =>
      client.mutation(api.todos.patch, { id: id as Id<'todos'>, name }),
    deleteForever: (id) =>
      client.mutation(api.todos.del, { id: id as Id<'todos'> }),
  },
} satisfies TodoProvider
