'use client'

import type { Todo } from '@prisma/client'
import { Button } from 'primereact/button'
import { useTransition } from 'react'

import { DataProvider } from '../data-providers/data-providers'
import buttonStyle from './buttons.module.css'
import { deleteForever, toggleDone } from './todo-buttons.actions'

type Props = {
  todo: Todo
  provider: DataProvider
}

const sharedProps = (loading: boolean) =>
  ({
    loading,
    disabled: loading,
    type: 'submit',
    size: 'small',
    outlined: true,
    className: buttonStyle.button,
  } as const)

export const ToggleDone = ({ todo, provider }: Props) => {
  const [isPending, startTransition] = useTransition()
  return (
    <form action={() => startTransition(() => toggleDone(provider, todo))}>
      {todo.done ? (
        <Button
          {...sharedProps(isPending)}
          data-testid="button-undo"
          label="Undo"
          icon="pi pi-replay"
        />
      ) : (
        <Button
          {...sharedProps(isPending)}
          data-testid="button-done"
          label="Done"
          icon="pi pi-check"
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
        type="submit"
        icon="pi pi-trash"
      />
    </form>
  )
}
