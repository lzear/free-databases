import type { Metadata } from 'next'
import React from 'react'

import { todoProviders } from '@/todo-providers'
import { TodosPage } from '../../todos/todos-page'

const PROVIDER = 'convex' as const

export const dynamic = 'force-static'
export const fetchCache = 'force-no-store'
export const metadata: Metadata = { title: todoProviders[PROVIDER].name }

const P = () => <TodosPage provider={PROVIDER} />
export default P
