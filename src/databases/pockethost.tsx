import * as process from 'node:process'

import PocketBase from 'pocketbase'

import { SingletonUnique } from '@/singletons'
import { TodoProvider } from '@/todo-providers'

const todosCollection = new SingletonUnique(async () => {
  if (
    !process.env.POCKETHOST_URL ||
    !process.env.POCKETHOST_EMAIL ||
    !process.env.POCKETHOST_PASSWORD
  )
    throw new Error('Missing PocketHost ENV')
  const pb = new PocketBase(process.env.POCKETHOST_URL)
  await pb.admins.authWithPassword(
    process.env.POCKETHOST_EMAIL,
    process.env.POCKETHOST_PASSWORD,
  )
  return pb.collection('todos')
})

export const pockethost = {
  name: 'PocketHost',
  slug: 'pockethost',
  icon: 'pocketbase.svg',
  description: (
    <p>
      The PocketHost.io database utilizes an internal SQLite instance, which is
      favored for its performance advantages over other databases like MySQL or
      PostgreSQL, making it suitable for powering applications efficiently. This
      setup provides users with a simple and efficient way to manage data for
      their hosted projects without the need for extensive database
      configuration.
    </p>
  ),
  server: {
    getTodos: async (done) => {
      const collection = await todosCollection.get()
      const todos = await collection.getFullList({
        filter: `done = ${done}`,
        requestKey: null,
      })
      return todos.map((todo) => ({
        id: todo.id,
        name: todo.name,
        done: todo.done,
        createdAt: new Date(todo.created),
        updatedAt: new Date(todo.updated),
      }))
    },
    create: async (name) => {
      const collection = await todosCollection.get()
      return collection.create({ name, done: false })
    },
    deleteForever: async (id) => {
      const collection = await todosCollection.get()
      return collection.delete(id)
    },
    setDone: async (id, done) => {
      const collection = await todosCollection.get()
      return collection.update(id, { done })
    },
    rename: async (id, name) => {
      const collection = await todosCollection.get()
      return collection.update(id, { name })
    },
  },
} satisfies TodoProvider
