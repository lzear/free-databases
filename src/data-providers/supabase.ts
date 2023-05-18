import type { Todo } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'

import { SingletonUnique } from '../singletons'
import { TodoProvider } from './todo-providers'

const supabase = new SingletonUnique(() => {
  if (!process.env.SUPABASE_URL) throw new Error('Missing SUPABASE_URL')
  if (!process.env.SUPABASE_KEY) throw new Error('Missing SUPABASE_KEY')

  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...init, cache: 'no-cache' }),
    },
  })
})

export const Supabase =
  (Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_KEY) &&
    ({
      name: 'Supabase',
      path: '/supabase',
      create: async (name) =>
        supabase.get().from('todos').insert({
          id: nanoid(),
          name,
          done: false,
        }),
      getTodos: async (done) => {
        const { data } = await supabase
          .get()
          .from('todos')
          .select()
          .eq('done', done)
        return (
          (data?.map((todo) => ({
            ...todo,
            createdAt: new Date(todo.created_at),
            updatedAt: new Date(todo.updated_at),
          })) as Todo[]) || []
        )
      },
      setDone: async (id, done) =>
        supabase
          .get()
          .from('todos')
          .update({ done, updated_at: new Date().toISOString() })
          .match({ id }),
      rename: async (id, name) =>
        supabase
          .get()
          .from('todos')
          .update({ name, updated_at: new Date().toISOString() })
          .match({ id }),
      deleteForever: async (id) =>
        supabase.get().from('todos').delete().match({ id }),
    } satisfies TodoProvider)) ||
  undefined
