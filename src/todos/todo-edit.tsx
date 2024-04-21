'use client'

import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'
import { useState, useTransition } from 'react'

import { Card } from '@/components/card'
import { DatabaseSlug } from '@/databases'
import type { TodoDto } from '@/todos-server/type'

import { create, rename } from './todo-buttons.actions'

export const TodoEdit = ({
  provider,
  editTodo,
  cancel,
}: {
  provider: DatabaseSlug
  editTodo?: TodoDto
  cancel?: () => void
}) => {
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState(editTodo?.name || '')
  return (
    <Card className="p-0">
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
        className="flex min-h-full flex-col"
      >
        <InputTextarea
          className="size-full min-h-full resize-y bg-transparent p-2"
          placeholder={editTodo ? 'Edit name' : 'Create a new item'}
          disabled={isPending}
          name="todo-name"
          rows={3}
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-label={editTodo ? 'Edit todo name' : 'Create a new todo'}
        />
        <div className="flex gap-2">
          <Button
            className="flex-1 p-2"
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
              className="flex-1 px-2 py-1"
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
