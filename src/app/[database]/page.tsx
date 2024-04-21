import type { Metadata } from 'next'
import React from 'react'

import { isDatabaseSlug } from '@/databases'
import { todoProviders } from '@/todo-providers'
import { TodosPage } from '@/todos/todos-page'

export const dynamic = 'force-static'

export const generateMetadata = ({
  params,
}: {
  params: { database?: string }
}): Metadata => {
  const slug = params?.['database']
  if (!isDatabaseSlug(slug)) return { title: 'Not found' }
  const todoProvider = todoProviders[slug]
  return { title: todoProvider.name }
}

const DataPage = (props: {
  params?: { database?: string }
  searchParams: unknown
}) => {
  const slug = props?.params?.['database']
  if (!isDatabaseSlug(slug)) return <div>404</div>
  return <TodosPage provider={slug} />
}
export default DataPage
