import { DeadProvider } from '../todo-providers'

export const bitio = {
  name: 'Bit.io',
  slug: 'bit-io',
  icon: 'bit-io.svg',
  description: (
    <>
      <p>
        Bit.io was a modern, cloud-based platform that simplifies data
        collaboration by enabling users to store, share, and analyze databases
        with ease, making data handling more efficient and accessible for teams.
      </p>
      <p>It was discontinued in June 2023.</p>
    </>
  ),
  dead: true,
  // server: pgImplementation(process.env.BITIO_POSTGRES_URL),
} satisfies DeadProvider
