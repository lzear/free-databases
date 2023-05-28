/* eslint-disable unicorn/filename-case */

import { mutation } from './_generated/server'

export default mutation(async ({ db }, { name }) => {
  return db.insert('todos', {
    name,
    done: false,
    updatedAt: new Date().toISOString(),
  })
})
