/* eslint-disable unicorn/filename-case */

import { query } from './_generated/server'

export default query(async ({ db }, { done }: { done: boolean }) => {
  return await db
    .query('todos')
    .filter((q) => q.eq(q.field('done'), done))
    .collect()
})
