import { TodoProvider } from '../todo-providers'
import { pgImplementation } from '../with-pg'

export const bitio = {
  name: 'Bit.io',
  slug: 'bit-io',
  icon: 'bit-io.svg',
  description: (
    <p>
      Bit.io is a modern, cloud-based platform that simplifies data
      collaboration by enabling users to store, share, and analyze databases
      with ease, making data handling more efficient and accessible for teams.
    </p>
  ),
  server: pgImplementation(process.env.BITIO_POSTGRES_URL),
} satisfies TodoProvider
