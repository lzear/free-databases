import { type TodoProvider } from '../todo-providers'
import { mysqlImplementation } from '../with-mysql'

export const tidbcloud = {
  name: 'TiDB Cloud',
  slug: 'tidbcloud',
  icon: 'tidbcloud.png',
  description: (
    <p>
      TiDB Cloud is a fully-managed cloud service for the TiDB Platform,
      providing a scalable, resilient, and distributed SQL database managed by
      PingCAP, which allows users to focus on their applications and data.
    </p>
  ),
  server: mysqlImplementation({
    uri: process.env.TIDBCLOUD_MYSQL_URL,
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    },
  }),
} satisfies TodoProvider
