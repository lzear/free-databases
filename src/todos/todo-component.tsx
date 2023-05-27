'use client'

import type { Todo } from '@prisma/client'
import { differenceInSeconds, formatDistance, formatISO } from 'date-fns'
import { Button } from 'primereact/button'
import React, { useState } from 'react'

import { Card } from '../components/card'
import { DataProviderSlug } from '../data-providers/data-providers'
import buttonStyle from './buttons.module.css'
import { randomColor } from './color'
import { DeleteForever, ToggleDone } from './todo-buttons'
import { TodoEdit } from './todo-edit'
import styles from './todos.module.css'

const displayTime = (dateTime: Date | string) => (
  <time dateTime={formatISO(new Date(dateTime))}>
    {formatDistance(new Date(dateTime), new Date())}
  </time>
)
const DisplayDate = ({ todo }: { todo: Todo }) => {
  if (
    Math.abs(
      differenceInSeconds(new Date(todo.createdAt), new Date(todo.updatedAt)),
    ) < 30
  )
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

export const TodoComponent = ({
  todo,
  provider,
}: {
  todo: Todo
  provider: DataProviderSlug
}) => {
  const [isEditing, setEditing] = useState(false)
  if (isEditing)
    return (
      <TodoEdit
        editTodo={todo}
        provider={provider}
        cancel={() => setEditing(false)}
      />
    )
  return (
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
          {/* @ts-expect-error ??? TS2786: 'Button' cannot be used as a JSX component. Its instance type 'Button' is not a valid JSX element. */}
          <Button
            size="small"
            outlined
            className={buttonStyle.button}
            icon="pi pi-pencil"
            tooltip="Edit"
            onClick={() => setEditing(true)}
            aria-label="Edit the todo text"
          />
          {todo.done && <DeleteForever todo={todo} provider={provider} />}
        </div>
      </div>
      <p className={styles.text}>{todo.name}</p>
    </Card>
  )
}
