'use server'

import type { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { DataProviderSlug } from '../data-providers/data-providers'
import { todoProviders } from '../data-providers/todo-providers'

export async function create(provider: DataProviderSlug, todoName: string) {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')

  await todoProvider.create(todoName)
  revalidatePath(`/${todoProvider.slug}`)
}

export async function rename(
  provider: DataProviderSlug,
  todoId: string,
  todoName: string,
) {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')

  await todoProvider.rename(todoId, todoName)
  revalidatePath(`/${todoProvider.slug}`)
}

export const toggleDone = async (provider: DataProviderSlug, todo: Todo) => {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')
  const { id, done } = todo
  await todoProvider.setDone(id, !done)
  revalidatePath(`/${todoProvider.slug}`)
}

export const deleteForever = async (provider: DataProviderSlug, todo: Todo) => {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')
  const { id, done } = todo
  await todoProvider.deleteForever(id)
  revalidatePath(`/${todoProvider.slug}`)
}
