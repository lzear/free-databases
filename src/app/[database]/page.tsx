import React from 'react'

import { isDatabaseSlug } from '../../databases'
import { TodosPage } from '../../todos/todos-page'

export const dynamic = 'force-static'

const DataPage = (props: {
  params?: { database?: string }
  searchParams: unknown
}) => {
  const slug = props?.params?.['database']
  if (!isDatabaseSlug(slug)) return <div>404</div>
  return <TodosPage provider={slug} />
}
export default DataPage
