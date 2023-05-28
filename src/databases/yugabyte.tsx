import { TodoProvider } from '../todo-providers'
import { pgImplementation } from '../with-pg'

export const yugabyte = {
  name: 'Yugabyte',
  slug: 'yugabyte',
  icon: 'yugabyte.svg',
  description: (
    <p>
      YugabyteDB is an open-source, high-performance, distributed SQL database
      built on a scalable and fault-tolerant design inspired by Google Spanner.
      It supports API compatibility with PostgreSQL and linear scalability,
      making it suitable for a wide range of applications, from mainframe
      migration and microservices to real-time analytics.
    </p>
  ),
  server:
    process.env.YUGABYTE_POSTGRES_HOST &&
    process.env.YUGABYTE_POSTGRES_USER &&
    process.env.YUGABYTE_POSTGRES_CA_CERT &&
    process.env.YUGABYTE_POSTGRES_PASSWORD
      ? pgImplementation({
          host: process.env.YUGABYTE_POSTGRES_HOST,
          user: process.env.YUGABYTE_POSTGRES_USER,
          database: 'yugabyte',
          port: 5433,
          password: process.env.YUGABYTE_POSTGRES_PASSWORD,
          ssl: {
            rejectUnauthorized: true,
            ca: process.env.YUGABYTE_POSTGRES_CA_CERT,
          },
        })
      : undefined,
} satisfies TodoProvider
