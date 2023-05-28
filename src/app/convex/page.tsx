import React from 'react'

import { TodosPage } from '../../todos/todos-page'

export const fetchCache = 'force-no-store'
export default function DataPage() {
  return <TodosPage provider="convex" />
}
