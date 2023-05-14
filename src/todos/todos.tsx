import 'server-only'

import type { Todo } from '@prisma/client'
import { differenceInSeconds, formatDistance, formatISO } from 'date-fns'
import React from 'react'

import { Card } from '../components/card'
import { DataProvider } from '../data-providers/data-providers'
import { todoProviders } from '../data-providers/todo-providers'
import { randomColor } from './color'
import { DeleteForever, ToggleDone } from './todo-buttons'
import styles from './todos.module.css'

type Props = {
  done: boolean
  provider: DataProvider
}

const displayTime = (dateTime: Date | string) => (
  <time dateTime={formatISO(new Date(dateTime))}>
    {formatDistance(new Date(dateTime), new Date())}
  </time>
)
const DisplayDate = ({ todo }: { todo: Todo }) => {
  if (Math.abs(differenceInSeconds(todo.createdAt, todo.updatedAt)) < 30)
    return (
      <p className={styles.date}>Created {displayTime(todo.createdAt)} ago.</p>
    )
  return (
    <p className={styles.date}>
      Created {displayTime(todo.createdAt)} ago.
      <br />
      Updated {displayTime(todo.updatedAt)} ago.
    </p>
  )
}

export const TodoList = async ({ done, provider }: Props) => {
  const todos = await todoProviders[provider].getTodos(done)
  return (
    <>
      {todos.map((todo) => (
        <Card
          data-testid="todo-card"
          key={todo.id}
          style={{
            background: randomColor(todo.id, 100, 60) + '12',
          }}
        >
          <div className={styles.header}>
            <DisplayDate todo={todo} />
            <div style={{ display: 'flex', gap: 5 }} data-testid="todos-done">
              <ToggleDone todo={todo} provider={provider} />
              {todo.done && <DeleteForever todo={todo} provider={provider} />}
            </div>
          </div>
          <p className={styles.text}>{todo.name}</p>
        </Card>
      ))}
    </>
  )
}
