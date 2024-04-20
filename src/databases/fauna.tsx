import { Client, query as q, Ref } from 'faunadb'

import { SingletonUnique } from '../singletons'
import { type TodoProvider } from '../todo-providers'
import type { Todo } from '../todos-server/type'

const clientSingleton = new SingletonUnique(() => {
  if (!process.env.FAUNADB_SECRET) throw new Error('Missing FAUNADB_SECRET')
  return new Client({
    secret: process.env.FAUNADB_SECRET,
  })
})

const client = () => clientSingleton.get()

export const fauna = {
  name: 'FaunaDB',
  slug: 'fauna',
  icon: 'fauna.svg',
  description: (
    <p>
      FaunaDB is a globally distributed, serverless, cloud-based NoSQL database
      service that is optimized for modern application development. It offers
      ACID transactions, GraphQL support, relational data model, and built-in
      security at the row and field level, making it a versatile solution for
      web, mobile, and serverless applications.
    </p>
  ),
  server: process.env.FAUNADB_SECRET
    ? {
        create: (name) =>
          client().query(
            q.Create(q.Collection('todos'), {
              data: {
                name,
                done: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            }),
          ),
        getTodos: async (done) => {
          const t = await client().query<{
            data: { data: Todo; ref: typeof Ref }[]
          }>(
            q.Map(
              q.Paginate(q.Match(q.Index('todos_by_done'), done)),
              q.Lambda((x) => q.Get(x)),
            ),
          )
          return t.data.map((x) => ({
            ...x.data,
            // @ts-expect-error ???
            id: x.ref.id as string,
          }))
        },
        setDone: async (reference, done) =>
          client().query(
            q.Update(q.Ref(q.Collection('todos'), reference), {
              data: { done },
            }),
          ),
        rename: async (reference, name) =>
          client().query(
            q.Update(q.Ref(q.Collection('todos'), reference), {
              data: { name },
            }),
          ),
        deleteForever: async (reference) =>
          client().query(q.Delete(q.Ref(q.Collection('todos'), reference))),
      }
    : undefined,
} satisfies TodoProvider
