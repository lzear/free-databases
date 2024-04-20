import { TodoProvider } from '../todo-providers'
import { pgPoolImplementation } from '../with-pg'

const config = !!process.env.TEMBO_POSTGRES_URL &&
  !!process.env.TEMBO_POSTGRES_CA_CERT && {
    connectionString: process.env.TEMBO_POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false,
      ca: process.env.TEMBO_POSTGRES_CA_CERT,
    },
  }

export const tembo = {
  name: 'Tembo',
  slug: 'tembo',
  icon: 'tembo.svg',
  description: (
    <p>
      Tembo is a Postgres developer platform for building every application and
      data service. It collapses the database sprawl of the modern data stack
      with a unified developer platform.
    </p>
  ),
  server: config ? pgPoolImplementation(config) : undefined,
} satisfies TodoProvider
