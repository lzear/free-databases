import { a } from '@upstash/redis/zmscore-4382faf4'
import { v } from 'convex/values'

import { mutation, query } from './_generated/server'

export const insert = mutation({
  args: { name: v.string() },
  handler: (context, arguments_) =>
    context.db.insert('todos', {
      name: arguments_.name,
      done: false,
      updatedAt: new Date().toISOString(),
    }),
})

export const get = query({
  args: { done: v.boolean() },
  handler: (context, arguments_) =>
    context.db
      .query('todos')
      .filter((q) => q.eq(q.field('done'), arguments_.done))
      .collect(),
})

const filterUndefined = <T extends Record<string, any>>(object: T) =>
  Object.fromEntries(Object.entries(object).filter(([k, v]) => v !== undefined))

export const patch = mutation({
  args: {
    id: v.id('todos'),
    name: v.optional(v.string()),
    done: v.optional(v.boolean()),
  },
  handler: (context, { id, ...rest }) =>
    context.db.patch(id, {
      ...rest,
      updatedAt: new Date().toISOString(),
    }),
})

export const del = mutation({
  args: { id: v.id('todos') },
  handler: (context, arguments_) => context.db.delete(arguments_.id),
})
