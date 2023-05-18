'use server'

import type { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { DataProvider } from '../data-providers/data-providers'
import { todoProviders } from '../data-providers/todo-providers'

export async function create(provider: DataProvider, todoName: string) {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')

  await todoProvider.create(todoName)
  revalidatePath(todoProvider.path)
}

export async function rename(
  provider: DataProvider,
  todoId: string,
  todoName: string,
) {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')

  await todoProvider.rename(todoId, todoName)
  revalidatePath(todoProvider.path)
}

export const toggleDone = async (provider: DataProvider, todo: Todo) => {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')
  const { id, done } = todo
  await todoProvider.setDone(id, !done)
  revalidatePath(todoProvider.path)
}

export const deleteForever = async (provider: DataProvider, todo: Todo) => {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')
  const { id, done } = todo
  await todoProvider.deleteForever(id)
  revalidatePath(todoProvider.path)
}
