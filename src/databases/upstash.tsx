import { Redis } from '@upstash/redis'
import { nanoid } from 'nanoid'

import { SingletonUnique } from '../singletons'
import { TodoProvider } from '../todo-providers'
import type { Todo } from '../todos-server/type'

const clientSingleton = new SingletonUnique(() => {
  if (!process.env.UPSTASH_REDIS_URL || !process.env.UPSTASH_REDIS_TOKEN)
    throw new Error('Missing UPSTASH_REDIS_URL or UPSTASH_REDIS_TOKEN')

  const config = {
    url: process.env.UPSTASH_REDIS_URL,
    token: process.env.UPSTASH_REDIS_TOKEN,
  }
  return new Redis(config)
})

const redis = () => clientSingleton.get()

export const upstash = {
  name: 'Upstash',
  slug: 'upstash',
  server:
    process.env.UPSTASH_REDIS_URL && process.env.UPSTASH_REDIS_TOKEN
      ? {
          create: (name) => {
            const id = nanoid()
            return redis().hmset('todos', {
              [id]: JSON.stringify({
                id,
                name,
                done: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }),
            })
          },
          getTodos: async (done) => {
            const results = await redis().hgetall<Record<string, Todo>>('todos')
            if (!results) return []
            return Object.values(results)
              .filter((todo) => todo.done === done)
              .map((todo) => ({
                ...todo,
                updatedAt: new Date(todo.updatedAt),
                createdAt: new Date(todo.createdAt),
              }))
          },
          setDone: async (id, done) => {
            const todo = await redis().hget<Todo>('todos', id)
            if (!todo) return
            return redis().hmset('todos', {
              [id]: JSON.stringify({
                ...todo,
                done,
                updatedAt: new Date().toISOString(),
              }),
            })
          },
          rename: async (id, name) => {
            const todo = await redis().hget<Todo>('todos', id)
            if (!todo) return
            return redis().hmset('todos', {
              [id]: JSON.stringify({
                ...todo,
                name,
                updatedAt: new Date().toISOString(),
              }),
            })
          },
          deleteForever: (id) => redis().hdel('todos', id),
        }
      : undefined,
  icon: 'upstash.png',
  description: (
    <p>
      Upstash is a serverless database platform that offers a fully managed and
      scalable Redis service, optimized for serverless and edge computing. It
      provides high performance with low latency, durable storage, and support
      for many Redis features.
    </p>
  ),
} satisfies TodoProvider
