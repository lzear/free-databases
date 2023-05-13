'use client'

import type { Todo } from '@prisma/client'
import { Button } from 'primereact/button'

import { DataProvider } from '../data-providers/data-providers'
import buttonStyle from './buttons.module.css'
import { deleteForever, toggleDone } from './todo-buttons.actions'

type Props = {
  todo: Todo
  provider: DataProvider
}
export const ToggleDone = ({ todo, provider }: Props) => {
  return (
    <form action={() => toggleDone(provider, todo)}>
      {todo.done ? (
        <Button
          size="small"
          label="Undo"
          icon="pi pi-replay"
          type="submit"
          outlined
          className={buttonStyle.button}
        />
      ) : (
        <Button
          size="small"
          label="Done"
          icon="pi pi-check"
          type="submit"
          className={buttonStyle.button}
        />
      )}
    </form>
  )
}

export const DeleteForever = ({ todo, provider }: Props) => {
  return (
    <form action={() => deleteForever(provider, todo)}>
      <Button
        type="submit"
        size="small"
        label="Delete"
        icon="pi pi-trash"
        outlined
        className={buttonStyle.button}
      />
    </form>
  )
}
