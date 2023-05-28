import type { Todo } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'

import { SingletonUnique } from '../singletons'
import { TodoProvider } from '../todo-providers'

const supabaseClient = new SingletonUnique(() => {
  if (!process.env.SUPABASE_URL) throw new Error('Missing SUPABASE_URL')
  if (!process.env.SUPABASE_KEY) throw new Error('Missing SUPABASE_KEY')

  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, { ...init, cache: 'no-cache' }),
    },
  })
})

export const supabase = {
  name: 'Supabase',
  slug: 'supabase',
  icon: 'supabase.png',
  description: (
    <p>
      Supabase is an open-source alternative to Firebase, providing a
      backend-as-a-service with real-time database, authentication, and storage.
      It utilizes PostgreSQL and offers RESTful and real-time APIs for rapid
      application development.
    </p>
  ),
  isAvailable: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_KEY),
  create: async (name) =>
    supabaseClient.get().from('todos').insert({
      id: nanoid(),
      name,
      done: false,
    }),
  getTodos: async (done) => {
    const { data } = await supabaseClient
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
    supabaseClient
      .get()
      .from('todos')
      .update({ done, updated_at: new Date().toISOString() })
      .match({ id }),
  rename: async (id, name) =>
    supabaseClient
      .get()
      .from('todos')
      .update({ name, updated_at: new Date().toISOString() })
      .match({ id }),
  deleteForever: async (id) =>
    supabaseClient.get().from('todos').delete().match({ id }),
} satisfies TodoProvider
