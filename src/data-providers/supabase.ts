import type { Todo } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'

import { TodoProvider } from './todo-providers'

if (!process.env.SUPABASE_URL) throw new Error('Missing SUPABASE_URL')
if (!process.env.SUPABASE_KEY) throw new Error('Missing SUPABASE_KEY')

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
)

export const Supabase = {
  name: 'Supabase',
  path: '/supabase',
  create: async (name) =>
    supabase.from('todos').insert({
      id: nanoid(),
      name,
      done: false,
    }),
  getTodos: async (done) => {
    const { data } = await supabase.from('todos').select().eq('done', done)
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
      .from('todos')
      .update({ done, updated_at: new Date().toISOString() })
      .match({ id }),
  deleteForever: async (id) => supabase.from('todos').delete().match({ id }),
} satisfies TodoProvider
