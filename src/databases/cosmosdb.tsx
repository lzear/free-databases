import { CosmosClient } from '@azure/cosmos'

import { TodoProvider } from '../todo-providers'
import type { ServerImplementation } from '../todos-server/type'

const databaseId = process.env.COSMOSDB_DATABASE_ID
const containerId = process.env.COSMOSDB_CONTAINER_ID

const client = () => {
  if (!process.env.COSMOSDB_CONNECTION_STRING)
    throw new Error('Missing COSMOSDB_CONNECTION_STRING')
  return new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING)
}

const server =
  databaseId && containerId && process.env.COSMOSDB_CONNECTION_STRING
    ? ({
        create: (name: string) =>
          client()
            .database(databaseId)
            .container(containerId)
            .items.upsert({ name, done: false, createdAt: new Date() }),
        getTodos: async (done: boolean) => {
          const { resources: results } = (await client()
            .database(databaseId)
            .container(containerId)
            .items.query({
              query: 'SELECT * FROM c WHERE c.done = @done',
              parameters: [{ name: '@done', value: done }],
            })
            .fetchAll()) as {
            resources: {
              id: string
              name: string
              done: boolean
              _ts: number
              createdAt: string
            }[]
          }
          return results.map(({ id, name, _ts, done, createdAt }) => ({
            id,
            done,
            name,
            createdAt: createdAt ? new Date(createdAt) : new Date(_ts * 1000),
            updatedAt: new Date(_ts * 1000),
          }))
        },
        setDone: (id: string, done: boolean) =>
          client()
            .database(databaseId)
            .container(containerId)
            .item(id)
            .patch([{ op: 'set', path: '/done', value: done }]),
        rename: (id: string, name: string) =>
          client()
            .database(databaseId)
            .container(containerId)
            .item(id)
            .patch([{ op: 'set', path: '/name', value: name }]),
        deleteForever: (id: string) =>
          client()
            .database(databaseId)
            .container(containerId)
            .items.bulk([{ operationType: 'Delete', id }]),
      } satisfies ServerImplementation)
    : undefined

export const cosmosdb = {
  name: 'Cosmos DB',
  slug: 'cosmosdb',
  icon: 'cosmosdb.svg',
  description: (
    <p>
      Azure Cosmos DB is a globally-distributed, multi-model database service
      offered by Microsoft Azure, providing turnkey horizontal scale-out,
      comprehensive SLAs, and support for multiple data models such as document,
      graph, key-value, table, and column-family with API support for SQL,
      MongoDB, Cassandra, Gremlin, and more.
    </p>
  ),
  server,
} satisfies TodoProvider
