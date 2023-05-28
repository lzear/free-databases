import { TodoProvider } from '../todo-providers'
import { pgImplementation } from '../with-pg'

export const elephant = {
  name: 'ElephantSQL',
  slug: 'elephant',
  icon: 'elephantsql.png',
  description: (
    <p>
      ElephantSQL is a fully-managed PostgreSQL database hosting service. It
      handles administrative tasks, provides automated backups, performance
      metrics, and enables easy scaling, all with high security and various
      plans including a free tier.
    </p>
  ),
  server: pgImplementation(process.env.ELEPHANT_POSTGRES_URL),
} satisfies TodoProvider
