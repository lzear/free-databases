import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
  id: text('id').notNull().primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  name: text('name').notNull(),
  done: boolean('done').notNull(),
})
