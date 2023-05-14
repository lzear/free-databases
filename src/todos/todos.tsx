import 'server-only'

import React from 'react'

import { CardGrid } from '../components/card'
import { DataProvider } from '../data-providers/data-providers'
import { todoProviders } from '../data-providers/todo-providers'
import { TodoComponent } from './todo-component'

type Props = {
  done: boolean
  provider: DataProvider
  title: string
  prepend?: React.ReactNode
}

export const TodoList = async ({ done, provider, title, prepend }: Props) => {
  const todos = await todoProviders[provider].getTodos(done)
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
