import React from 'react'

import { TodosPage } from '../../todos/todos-page'

export const dynamic = 'force-static'
export const fetchCache = 'force-no-store'

export default function DetaPage() {
  return <TodosPage provider="deta" />
}
