import {
  boolean,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

export const todos = mysqlTable('todos', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  name: text('name').notNull(),
  done: boolean('done').notNull(),
})
