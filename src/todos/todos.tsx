import 'server-only'

import React, { Suspense } from 'react'

import { CardLoading } from '@/components/card'
import { DatabaseSlug } from '@/databases'
import { todoProviders } from '@/todo-providers'
import { todoToDto } from '@/todos-server/type'

import { TodoComponent } from './todo-component'

type Props = {
  done: boolean
  provider: DatabaseSlug
  title: string
  prepend?: React.ReactNode
}

const TodosAsync = async ({
  done,
  provider,
}: {
  done: boolean
  provider: DatabaseSlug
}) => {
  const todoProvider = todoProviders[provider]
  const todos = await todoProvider.server?.getTodos(done)

  if (!todos || todos.length === 0)
    return (
      <div className="min-h-12 px-2 py-4 opacity-60">
        <p>
          <em>No items in the list...</em>
        </p>
      </div>
    )

  return todos?.map((todo) => (
    <TodoComponent key={todo.id} todo={todoToDto(todo)} provider={provider} />
  ))
}

export const LoadingTodos = () =>
  Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => (
    <CardLoading key={i} />
  ))

export const TodoList = ({ done, provider, title, prepend }: Props) => {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error(`Unknown provider ${provider}`)

  return (
    <div className="flex flex-col gap-5">
      <h2>{title}</h2>
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4">
        {prepend}
        <Suspense fallback={<LoadingTodos />}>
          <TodosAsync done={done} provider={provider} />
        </Suspense>
      </div>
    </div>
  )
}
