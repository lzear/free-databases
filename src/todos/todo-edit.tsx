'use client'

import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'
import { useState, useTransition } from 'react'

import { Card } from '../components/card'
import { DataProvider } from '../data-providers/data-providers'
import buttonStyle from './buttons.module.css'
import style from './new-todo.module.css'
import { create } from './todo-buttons.actions'

export const NewTodo = ({ provider }: { provider: DataProvider }) => {
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState('')
  return (
    <Card style={{ padding: 0 }}>
      <form
        action={() => {
          startTransition(async () => {
            await create(provider, name)
            setName('')
          })
        }}
        className={style.newTodo}
      >
        <InputTextarea
          style={{ resize: 'vertical', width: '100%' }}
          placeholder="Create a new item"
          disabled={isPending}
          name="todo-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Button
          className={buttonStyle.button}
          type="submit"
          loading={isPending}
          disabled={name.length === 0 || isPending}
          size="small"
          label="Save"
          icon="pi pi-save"
        />
      </form>
    </Card>
  )
}
