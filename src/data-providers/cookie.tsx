import type { Todo } from '@prisma/client'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'

import { TodoProvider } from './todo-providers'

const KEY = 'todos'

const getTodos = async (): Promise<Todo[]> => {
  const cookiesList = cookies()
  const todosString = cookiesList.get(KEY)?.value
  if (todosString) return JSON.parse(todosString)
  return []
}

export const cookie = {
  name: 'Cookie',
  slug: 'cookie',
  icon: 'cookie.png',
  description: (
    <p>
      A cookie is a small text file stored on a user&apos;s browser by a website
      to remember information or preferences. It enables stateful interactions,
      like tracking user sessions, retaining login information, or personalizing
      user experiences.
    </p>
  ),
  isAvailable: true,
  create: async (name) => {
    const todos = await getTodos()
    const newTodos = [
      {
        id: nanoid(),
        name,
        done: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ...todos,
    ]

    // @ts-expect-error somehow the type of cookies() is readonly
    cookies().set(KEY, JSON.stringify(newTodos))
  },
  getTodos: async (done) => {
    const todos = await getTodos()
    return todos
      .filter((todo) => todo.done === done)
      .map((todo) => ({
        ...todo,
        updatedAt: new Date(todo.updatedAt),
        createdAt: new Date(todo.createdAt),
      }))
  },
  setDone: async (id, done) => {
    const todos = await getTodos()
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, done, updatedAt: new Date().toISOString() }
        : todo,
    )
    // @ts-expect-error somehow the type of cookies() is readonly
    cookies().set(KEY, JSON.stringify(newTodos))
  },
  rename: async (id, name) => {
    const todos = await getTodos()
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, name, updatedAt: new Date().toISOString() }
        : todo,
    )
    // @ts-expect-error somehow the type of cookies() is readonly
    cookies().set(KEY, JSON.stringify(newTodos))
  },
  deleteForever: async (id) => {
    const todos = await getTodos()
    const newTodos = todos.filter((todo) => todo.id !== id)
    // @ts-expect-error somehow the type of cookies() is readonly
    cookies().set(KEY, JSON.stringify(newTodos))
  },
} satisfies TodoProvider
