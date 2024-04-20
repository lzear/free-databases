import React from 'react'

import { TodosPage } from '../../todos/todos-page'

export const dynamic = 'auto'

const CookiePage = () => <TodosPage provider="cookie" />
export default CookiePage
