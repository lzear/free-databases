'use client'

import type { Todo } from '@prisma/client'
import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'
import { useState, useTransition } from 'react'

import { Card } from '../components/card'
import { DataProvider } from '../data-providers/data-providers'
import buttonStyle from './buttons.module.css'
import { create, rename } from './todo-buttons.actions'
import style from './todo-edit.module.css'

export const TodoEdit = ({
  provider,
  editTodo,
  cancel,
}: {
  provider: DataProvider
  editTodo?: Todo
  cancel?: () => void
}) => {
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState(editTodo?.name || '')
  return (
    <Card style={{ padding: 0 }}>
      <form
        action={() => {
          startTransition(async () => {
            if (editTodo) {
              await rename(provider, editTodo.id, name)
              cancel?.()
            } else {
              await create(provider, name)
              setName('')
            }
          })
        }}
        className={style.newTodo}
      >
        <InputTextarea
          style={{ resize: 'vertical', width: '100%' }}
          placeholder={editTodo ? 'Edit name' : 'Create a new item'}
          disabled={isPending}
          name="todo-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div className={style.editButtons}>
          <Button
            className={buttonStyle.button}
            type="submit"
            loading={isPending}
            disabled={name.length === 0 || isPending}
            size="small"
            label="Save"
            icon="pi pi-save"
          />
          {cancel && (
            <Button
              onClick={cancel}
              className={buttonStyle.button}
              disabled={isPending}
              size="small"
              label="Cancel"
              icon="pi pi-times"
              outlined
            />
          )}
        </div>
      </form>
    </Card>
  )
}
