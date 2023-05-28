import { ConvexHttpClient } from 'convex/browser'

import { Id } from '../../convex/_generated/dataModel'
import { query } from '../../convex/_generated/server'
import type { TodoProvider } from '../todo-providers'

export default query(async ({ db }) => {
  return await db.query('tasks').collect()
})

const client = new ConvexHttpClient('https://quick-bison-109.convex.cloud')

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
    create: (name) => client.mutation('insertTodo', { name }),
    getTodos: async (done) => {
      const t: {
        _id: Id
        _creationTime: number
        name: string
        updatedAt: string
        done: boolean
      }[] = await client.query('getTodos', { done })
      return t.map(({ _id, _creationTime, ...rest }) => ({
        ...rest,
        id: _id.id,
        createdAt: new Date(_creationTime),
        updatedAt: new Date(rest.updatedAt),
      }))
    },
    setDone: (id, done) => client.mutation('patchTodo', { id, done }),
    rename: (id, name) => client.mutation('patchTodo', { id, name }),
    deleteForever: (id) => client.mutation('deleteTodo', { id }),
  },
} satisfies TodoProvider
