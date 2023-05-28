import React from 'react'

import { TodosPage } from '../../todos/todos-page'

export const dynamic = 'auto'

export default function DataPage() {
  return <TodosPage provider="cookie" />
}
