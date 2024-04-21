'use client'

import { differenceInSeconds, formatDistance, formatISO } from 'date-fns'
import { Button } from 'primereact/button'
import React, { useState } from 'react'

import { Card } from '@/components/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DatabaseSlug } from '@/databases'
import type { Todo, TodoDto } from '@/todos-server/type'

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
const DisplayDate = ({ todo }: { todo: Todo | TodoDto }) => {
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
  todo: TodoDto
  provider: DatabaseSlug
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
      <div className="mb-2 inline-flex w-full flex-row-reverse items-start justify-between gap-2">
        <DisplayDate todo={todo} />
        <div className="flex gap-1" data-testid="todos-done">
          <ToggleDone todo={todo} provider={provider} />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="small"
                outlined
                className={buttonStyle.button}
                icon="pi pi-pencil"
                onClick={() => setEditing(true)}
                aria-label="Edit the todo text"
              />
            </TooltipTrigger>
            <TooltipContent className="opacity-70">
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
          {todo.done && <DeleteForever todo={todo} provider={provider} />}
        </div>
      </div>
      <p className="m-0 whitespace-pre-wrap break-all text-2xl font-bold leading-normal opacity-80">
        {todo.name}
      </p>
    </Card>
  )
}
