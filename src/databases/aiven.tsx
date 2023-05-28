import { TodoProvider } from '../todo-providers'
import { pgImplementation } from '../with-pg'

const config = process.env.AIVEN_POSTGRES_URL &&
  process.env.AIVEN_POSTGRES_CA_CERT && {
    connectionString: process.env.AIVEN_POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false,
      ca: process.env.AIVEN_POSTGRES_CA_CERT,
    },
  }

export const aiven = {
  name: 'Aiven',
  slug: 'aiven',
  icon: 'aiven.svg',
  description: (
    <p>
      Aiven.io is a managed cloud services provider offering cloud database and
      messaging services, including Apache Kafka, PostgreSQL, MySQL,
      Elasticsearch, among others, across several major cloud platforms. Its
      services encompass automated backups, failover/redundancy, monitoring, and
      more.
    </p>
  ),
  server: pgImplementation(config),
} satisfies TodoProvider
