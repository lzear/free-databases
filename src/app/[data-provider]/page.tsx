import React from 'react'

import { isDataProviderSlug } from '../../data-providers/data-providers'
import { TodosPage } from '../../todos/todos-page'

export default function DataPage(props: {
  params?: { 'data-provider'?: string }
  searchParams: {}
}) {
  const slug = props?.params?.['data-provider']
  if (!isDataProviderSlug(slug)) return <div>404</div>
  return <TodosPage provider={slug} />
}
