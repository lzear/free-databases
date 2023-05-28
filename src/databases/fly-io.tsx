import { TodoProvider } from '../todo-providers'
import { pgImplementation } from '../with-pg'

export const flyio = {
  name: 'Fly.io',
  slug: 'fly-io',
  server:
    process.env.FLYIO_POSTGRES_HOST &&
    process.env.FLYIO_POSTGRES_USER &&
    process.env.FLYIO_POSTGRES_PASSWORD
      ? pgImplementation({
          host: process.env.FLYIO_POSTGRES_HOST,
          user: process.env.FLYIO_POSTGRES_USER,
          password: process.env.FLYIO_POSTGRES_PASSWORD,
        })
      : undefined,
  icon: 'fly-io.webp',
  description: (
    <p>
      Fly.io is a developer-friendly hosting service that deploys applications
      globally for faster performance and lower latency. It supports automatic
      SSL, custom domains, and scalable infrastructure.
    </p>
  ),
} satisfies TodoProvider
