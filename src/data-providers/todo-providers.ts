import type { Todo } from '@prisma/client'

import { Cookie } from './cookie'
import { DataProvider } from './data-providers'
import { PlanetScale } from './planetscale'
import { Supabase } from './supabase'

export type TodoProvider = {
  name: string
  path: string
  getTodos: (done: boolean) => Promise<Array<Todo>>
  create: (todoName: string) => Promise<any>
  deleteForever: (todoId: string) => Promise<any>
  setDone: (todoId: string, value: boolean) => Promise<any>
}

export const todoProviders = {
  PlanetScale,
  Supabase,
  Cookie,
} satisfies Record<DataProvider, TodoProvider>
