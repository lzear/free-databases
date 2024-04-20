'use client'

import { Button } from 'primereact/button'
import { useTransition } from 'react'

import { DatabaseSlug } from '@/databases'
import type { TodoDto } from '@/todos-server/type'

import buttonStyle from './buttons.module.css'
import { deleteForever, toggleDone } from './todo-buttons.actions'

type Props = {
  todo: TodoDto
  provider: DatabaseSlug
}

const sharedProps = (loading: boolean) =>
  ({
    loading,
    disabled: loading,
    type: 'submit',
    size: 'small',
    outlined: true,
    className: buttonStyle.button,
  }) as const

export const ToggleDone = ({ todo, provider }: Props) => {
  const [isPending, startTransition] = useTransition()
  return (
    <form action={() => startTransition(() => toggleDone(provider, todo))}>
      {todo.done ? (
        <Button
          {...sharedProps(isPending)}
          data-testid="button-undo"
          tooltip="Undo"
          icon="pi pi-replay"
          aria-label="Undo the done status of this todo"
        />
      ) : (
        <Button
          {...sharedProps(isPending)}
          data-testid="button-done"
          tooltip="Done"
          icon="pi pi-check"
          aria-label="Mark this todo as done"
        />
      )}
    </form>
  )
}

export const DeleteForever = ({ todo, provider }: Props) => {
  const [isPending, startTransition] = useTransition()
  return (
    <form action={() => startTransition(() => deleteForever(provider, todo))}>
      <Button
        {...sharedProps(isPending)}
        data-testid="button-delete"
        tooltip="Delete forever"
        type="submit"
        icon="pi pi-trash"
        aria-label="Delete this todo forever"
      />
    </form>
  )
}
