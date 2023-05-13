import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

import { TodoProvider } from './todo-providers'

const prisma = new PrismaClient()

export const PlanetScale = {
  name: 'PlanetScale',
  path: 'planetscale',
  create: (name) =>
    prisma.todo.create({
      data: {
        id: nanoid(),
        name,
        done: false,
      },
    }),
  getTodos: (done) =>
    prisma.todo.findMany({
      where: { done },
      orderBy: { createdAt: 'desc' },
    }),
  setDone: (id, done) =>
    prisma.todo.update({
      where: { id },
      data: { done },
    }),
  deleteForever: (id) => prisma.todo.delete({ where: { id } }),
} satisfies TodoProvider
