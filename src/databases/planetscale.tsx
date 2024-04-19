import { PrismaClient } from '@prisma/client'

import { SingletonUnique } from '../singletons'
import { DeadProvider } from '../todo-providers'

const prisma = new SingletonUnique(() => new PrismaClient())

export const planetscale = {
  name: 'PlanetScale',
  slug: 'planetscale',
  icon: 'planetscale.svg',
  description: (
    <>
      <p>
        PlanetScale is a serverless database platform using Vitess for scalable
        MySQL management. It provides horizontal scaling, high availability, and
        global data distribution.
      </p>
      <p>On April 8th, 2024, PlanetScale removed the (free) Hobby tier.</p>
    </>
  ),
  dead: 'HOBBY TIER REMOVED',
  // server: process.env.PLANETSCALE_DATABASE_URL
  //   ? {
  //       create: (name) =>
  //         prisma.get().todo.create({
  //           data: {
  //             id: nanoid(),
  //             name,
  //             done: false,
  //           },
  //         }),
  //       getTodos: (done) =>
  //         prisma.get().todo.findMany({
  //           where: { done },
  //           orderBy: { createdAt: 'desc' },
  //         }),
  //       setDone: (id, done) =>
  //         prisma.get().todo.update({
  //           where: { id },
  //           data: { done },
  //         }),
  //       rename: (id, name) =>
  //         prisma.get().todo.update({
  //           where: { id },
  //           data: { name },
  //         }),
  //       deleteForever: (id) => prisma.get().todo.delete({ where: { id } }),
  //     }
  //   : undefined,
} satisfies DeadProvider
