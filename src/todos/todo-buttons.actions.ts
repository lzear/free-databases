'use server'

import type { Todo } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { DatabaseSlug } from '../databases'
import { todoProviders } from '../todo-providers'

export async function create(provider: DatabaseSlug, todoName: string) {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')

  await todoProvider.server?.create(todoName)
  revalidatePath(`/${todoProvider.slug}`)
}

export async function rename(
  provider: DatabaseSlug,
  todoId: string,
  todoName: string,
) {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')

  await todoProvider.server?.rename(todoId, todoName)
  revalidatePath(`/${todoProvider.slug}`)
}

export const toggleDone = async (provider: DatabaseSlug, todo: Todo) => {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')
  const { id, done } = todo
  await todoProvider.server?.setDone(id, !done)
  revalidatePath(`/${todoProvider.slug}`)
}

export const deleteForever = async (provider: DatabaseSlug, todo: Todo) => {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')
  const { id, done } = todo
  await todoProvider.server?.deleteForever(id)
  revalidatePath(`/${todoProvider.slug}`)
}
