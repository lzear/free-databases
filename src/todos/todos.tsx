import 'server-only'

import React from 'react'

import { CardGrid } from '../components/card'
import { DatabaseSlug } from '../databases'
import { todoProviders } from '../todo-providers'
import { todoToDto } from '../todos-server/type'
import { TodoComponent } from './todo-component'

type Props = {
  done: boolean
  provider: DatabaseSlug
  title: string
  prepend?: React.ReactNode
}

export const TodoList = async ({ done, provider, title, prepend }: Props) => {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error(`Unknown provider ${provider}`)

  const todos = await todoProvider.server?.getTodos(done)

  return (
    <>
      {(prepend || (todos && todos.length > 0)) && (
        <h2 style={{ margin: '40px 0 20px' }}>{title}</h2>
      )}
      <CardGrid>
        {prepend}
        {todos?.map((todo) => (
          <TodoComponent
            key={todo.id}
            todo={todoToDto(todo)}
            provider={provider}
          />
        ))}
      </CardGrid>
    </>
  )
}
