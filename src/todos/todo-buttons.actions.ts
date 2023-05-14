'use server'

import type { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { DataProvider } from '../data-providers/data-providers'
import { todoProviders } from '../data-providers/todo-providers'

export async function create(provider: DataProvider, todoName: string) {
  await todoProviders[provider].create(todoName)
  revalidatePath(todoProviders[provider].path)
}

export const toggleDone = async (provider: DataProvider, todo: Todo) => {
  const { id, done } = todo
  await todoProviders[provider].setDone(id, !done)
  revalidatePath(todoProviders[provider].path)
}

export const deleteForever = async (provider: DataProvider, todo: Todo) => {
  const { id, done } = todo
  await todoProviders[provider].deleteForever(id)
  revalidatePath(todoProviders[provider].path)
}
