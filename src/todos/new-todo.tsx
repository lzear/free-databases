'use client'

import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'
import { useState } from 'react'

import { Card } from '../components/card'
import { DataProvider } from '../data-providers/data-providers'
import buttonStyle from './buttons.module.css'
import style from './new-todo.module.css'
import { create } from './todo-buttons.actions'

export const NewTodo = ({ provider }: { provider: DataProvider }) => {
  const [name, setName] = useState('')
  return (
    <Card>
      <form
        action={() => {
          setName('')
          return create(provider, name)
        }}
        className={style.newTodo}
      >
        <InputTextarea
          placeholder="Create a new item"
          name="todo-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Button
          className={buttonStyle.button}
          type="submit"
          loading={isPending}
          disabled={name.length === 0}
          size="small"
          label="Save"
          icon="pi pi-save"
        />
      </form>
    </Card>
  )
}
