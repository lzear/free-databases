import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'

import { SingletonUnique } from '../singletons'
import { TodoProvider } from './todo-providers'

const prisma = new SingletonUnique(() => new PrismaClient())

export const PlanetScale =
  (Boolean(process.env.DATABASE_URL) &&
    ({
      name: 'PlanetScale',
      path: '/planetscale',
      create: (name) =>
        prisma.get().todo.create({
          data: {
            id: nanoid(),
            name,
            done: false,
          },
        }),
      getTodos: (done) =>
        prisma.get().todo.findMany({
          where: { done },
          orderBy: { createdAt: 'desc' },
        }),
      setDone: (id, done) =>
        prisma.get().todo.update({
          where: { id },
          data: { done },
        }),
      rename: (id, name) =>
        prisma.get().todo.update({
          where: { id },
          data: { name },
        }),
      deleteForever: (id) => prisma.get().todo.delete({ where: { id } }),
    } satisfies TodoProvider)) ||
  undefined
