/* eslint-disable unicorn/filename-case */

import { GenericId } from 'convex/values'

import { mutation } from './_generated/server'

export default mutation(
  async (
    { db },
    { id, ...newTodo }: { id: string; name?: string; done?: boolean },
  ) => {
    await db.patch(new GenericId('todos', id), {
      ...newTodo,
      updatedAt: new Date().toISOString(),
    })
  },
)
