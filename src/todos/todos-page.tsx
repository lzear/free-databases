import 'server-only'

import React from 'react'

import { MainNav } from '@/components/next-description'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DatabaseSlug } from '@/databases'
import { todoProviders } from '@/todo-providers'

import { TodoEdit } from './todo-edit'
import { TodoList } from './todos'

export const TodosPage = ({ provider }: { provider: DatabaseSlug }) => {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error(`Unknown provider ${provider}`)

  return (
    <MainNav top={<p>CRUD demo using {todoProvider.name}</p>}>
      <TooltipProvider delayDuration={0} disableHoverableContent>
        <div className="mt-16 flex flex-col gap-20">
          <TodoList
            provider={provider}
            done={false}
            title="To do"
            prepend={<TodoEdit provider={provider} />}
          />

          <TodoList provider={provider} done={true} title="Done" />
        </div>
      </TooltipProvider>
    </MainNav>
  )
}
