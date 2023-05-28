/* eslint-disable unicorn/filename-case */

import { GenericId } from 'convex/values'

import { mutation } from './_generated/server'

export default mutation(async ({ db }, { id }: { id: string }) => {
  await db.delete(new GenericId('todos', id))
})
