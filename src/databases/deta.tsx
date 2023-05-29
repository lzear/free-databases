import { Deta } from 'deta'

import { TodoProvider } from '../todo-providers'
import type { ServerImplementation, Todo } from '../todos-server/type'

const detaTodos = () => Deta().Base('todos')

const server = process.env.DETA_PROJECT_KEY
  ? ({
      create: (name: string) =>
        detaTodos().put({
          name,
          done: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      getTodos: async (done: boolean) => {
        const r = await detaTodos().fetch({ done })
        return r.items.map(
          ({ key, ...todo }) => ({ ...todo, id: key } as unknown as Todo),
        )
      },
      setDone: (id: string, done: boolean) =>
        detaTodos().update({ done, updatedAt: new Date().toISOString() }, id),
      rename: (id: string, name: string) =>
        detaTodos().update({ name, updatedAt: new Date().toISOString() }, id),
      deleteForever: (id: string) => detaTodos().delete(id),
    } satisfies ServerImplementation)
  : undefined
export const deta = {
  name: 'Deta',
  slug: 'deta',
  icon: 'deta.svg',
  description: (
    <p>
      Deta Space is a cloud-hosting service that enables users to run sandboxed
      apps in a personal cloud, providing full visibility of app data storage.
      It also offers a marketplace for developers, simplifying app creation by
      handling infrastructure management, including servers, security, data, and
      payments.
    </p>
  ),
  server,
} satisfies TodoProvider
