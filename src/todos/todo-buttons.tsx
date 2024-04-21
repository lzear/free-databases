'use client'

import { Button } from 'primereact/button'
import React, { useTransition } from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
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
      <Tooltip>
        {todo.done ? (
          <>
            <TooltipTrigger asChild>
              <Button
                {...sharedProps(isPending)}
                data-testid="button-undo"
                icon="pi pi-replay"
                aria-label="Undo the done status of this todo"
              />
            </TooltipTrigger>
            <TooltipContent className="opacity-70">
              <p>Undo</p>
            </TooltipContent>
          </>
        ) : (
          <>
            <TooltipTrigger asChild>
              <Button
                {...sharedProps(isPending)}
                data-testid="button-done"
                icon="pi pi-check"
                aria-label="Mark this todo as done"
              />
            </TooltipTrigger>
            <TooltipContent className="opacity-70">
              <p>Done</p>
            </TooltipContent>
          </>
        )}
      </Tooltip>
    </form>
  )
}

export const DeleteForever = ({ todo, provider }: Props) => {
  const [isPending, startTransition] = useTransition()
  return (
    <form action={() => startTransition(() => deleteForever(provider, todo))}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            {...sharedProps(isPending)}
            data-testid="button-delete"
            type="submit"
            icon="pi pi-trash"
            aria-label="Delete this todo forever"
          />
        </TooltipTrigger>
        <TooltipContent className="opacity-70">
          <p>Delete forever</p>
        </TooltipContent>
      </Tooltip>
    </form>
  )
}
