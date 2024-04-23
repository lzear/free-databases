import { TodoProvider } from '@/todo-providers'
import { pgImplementation } from '@/with-pg'

export const koyeb = {
  name: 'Koyeb',
  slug: 'koyeb',
  icon: 'koyeb.svg',
  description: (
    <p>
      Koyeb is a developer-friendly serverless platform to deploy apps globally.
      No-ops, servers, and infrastructure management.
    </p>
  ),
  server: pgImplementation(process.env.KOYEB_POSTGRES_URL),
} satisfies TodoProvider
