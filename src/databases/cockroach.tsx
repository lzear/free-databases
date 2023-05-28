import { TodoProvider } from '../todo-providers'
import { pgImplementation } from '../with-pg'

export const cockroach = {
  name: 'CockroachDB',
  slug: 'cockroach',
  icon: 'cockroach.svg',
  description: (
    <p>
      CockroachDB is an open-source, distributed SQL database that is designed
      to store copies of data in multiple locations in order to deliver speedy
      access. Its key features include horizontal scaling, strong consistency,
      and survivability, hence the name &ldquo;Cockroach&rdquo;.
    </p>
  ),
  server: pgImplementation(process.env.COCKROACH_POSTGRES_URL),
} satisfies TodoProvider
