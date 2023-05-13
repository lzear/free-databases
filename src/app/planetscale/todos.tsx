import 'server-only'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const Todos = async () => {
  const todos = await prisma.todo.findMany()
  console.log('🦺 antoinelog todos', todos)

  return <div>todos</div>
}
