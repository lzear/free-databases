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
    process.env.YUGABYTE_POSTGRES_URL && process.env.YUGABYTE_POSTGRES_CA_CERT
      ? pgImplementation({
          connectionString: process.env.YUGABYTE_POSTGRES_URL,
          ssl: {
            rejectUnauthorized: true,
            ca: process.env.YUGABYTE_POSTGRES_CA_CERT,
          },
        })
      : undefined,
} satisfies TodoProvider
