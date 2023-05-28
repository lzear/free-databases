import { TodoProvider } from '../todo-providers'
import { pgImplementation } from '../with-pg'

export const railway = {
  name: 'Railway',
  slug: 'railway',
  server: pgImplementation(process.env.RAILWAY_DATABASE_URL),
  icon: 'railway.svg',
  description: (
    <p>
      Railway is an infrastructure platform where you can provision
      infrastructure, develop with that infrastructure locally, and then deploy
      to the cloud.
    </p>
  ),
} satisfies TodoProvider
