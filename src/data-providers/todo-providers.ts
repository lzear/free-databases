import { Todo } from '@prisma/client'

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
} satisfies Record<DataProvider, TodoProvider>
