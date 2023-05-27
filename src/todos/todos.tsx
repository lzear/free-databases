import 'server-only'

import React from 'react'

import { CardGrid } from '../components/card'
import { DataProviderSlug } from '../data-providers/data-providers'
import { todoProviders } from '../data-providers/todo-providers'
import { TodoComponent } from './todo-component'

type Props = {
  done: boolean
  provider: DataProviderSlug
  title: string
  prepend?: React.ReactNode
}

export const TodoList = async ({ done, provider, title, prepend }: Props) => {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error(`Unknown provider ${provider}`)

  const todos = await todoProvider.getTodos(done)
  console.log('🦺 antoinelog todos', todos);

  return (
    <>
      {(prepend || todos.length > 0) && (
        <h2 style={{ margin: '40px 0 20px' }}>{title}</h2>
      )}
      <CardGrid>
        {prepend}
        {todos.map((todo) => (
          <TodoComponent key={todo.id} todo={todo} provider={provider} />
        ))}
      </CardGrid>
    </>
  )
}
