'use server'

import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

export async function create(formData: FormData) {
  const prisma = new PrismaClient()

  const todoName = formData.get('todo-name')

  if (!(todoName && typeof todoName === 'string')) {
    return
  }
  return prisma.todo.create({
    data: {
      id: nanoid(),
      name: todoName,
      done: false,
    },
  })
}
