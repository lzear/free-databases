import { TodoProvider } from '../todo-providers'
import { pgImplementation } from '../with-pg'

export const neon = {
  name: 'Neon',
  slug: 'neon',
  icon: 'neon.svg',
  description: (
    <p>
      Neon is a serverless open-source alternative to AWS Aurora Postgres. It
      separates storage and compute and substitutes the PostgreSQL storage layer
      by redistributing data across a cluster of nodes.
    </p>
  ),
  server: pgImplementation(process.env.NEON_POSTGRES_URL),
} satisfies TodoProvider
