import React from 'react'

import { isDatabaseSlug } from '../../databases'
import { TodosPage } from '../../todos/todos-page'

export default function DataPage(props: {
  params?: { database?: string }
  searchParams: {}
}) {
  const slug = props?.params?.['database']
  if (!isDatabaseSlug(slug)) return <div>404</div>
  return <TodosPage provider={slug} />
}
