import { DeadProvider } from '../todo-providers'

export const planetscale = {
  name: 'PlanetScale',
  slug: 'planetscale',
  icon: 'planetscale.svg',
  description: (
    <>
      <p>
        PlanetScale is a serverless database platform using Vitess for scalable
        MySQL management. It provides horizontal scaling, high availability, and
        global data distribution.
      </p>
      <p>On April 8th, 2024, PlanetScale removed the (free) Hobby tier.</p>
    </>
  ),
  dead: 'HOBBY TIER REMOVED',
} satisfies DeadProvider
