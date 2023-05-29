'use server'

import { revalidatePath } from 'next/cache'

import { DatabaseSlug } from '../databases'
import { todoProviders } from '../todo-providers'
import type { TodoDto } from '../todos-server/type'

const MAX_NAME_LENGTH = 200

export async function create(provider: DatabaseSlug, name: string) {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')

  await todoProvider.server?.create(name.slice(0, Math.max(0, MAX_NAME_LENGTH)))
  revalidatePath(`/${todoProvider.slug}`)
}

export async function rename(provider: DatabaseSlug, id: string, name: string) {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')

  if (!id) throw new Error('Need id')

  await todoProvider.server?.rename(
    id,
    name.slice(0, Math.max(0, MAX_NAME_LENGTH)),
  )
  revalidatePath(`/${todoProvider.slug}`)
}

export const toggleDone = async (provider: DatabaseSlug, todo: TodoDto) => {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')
  const { id, done } = todo
  if (!id) throw new Error('Need id')
  await todoProvider.server?.setDone(id, !done)
  revalidatePath(`/${todoProvider.slug}`)
}

export const deleteForever = async (provider: DatabaseSlug, todo: TodoDto) => {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error('Invalid provider')
  const { id } = todo
  if (!id) throw new Error('Need id')
  await todoProvider.server?.deleteForever(id)
  revalidatePath(`/${todoProvider.slug}`)
}
