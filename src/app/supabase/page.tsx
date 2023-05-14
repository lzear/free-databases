import React from 'react'

import { DataProviders } from '../../data-providers/data-providers'
import { TodosPage } from '../../todos/todos-page'

export default function Supabase() {
  return <TodosPage provider={DataProviders.Supabase} />
}
