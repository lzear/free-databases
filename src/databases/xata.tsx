import { TodoProvider } from '../todo-providers'
import { ServerImplementation } from '../todos-server/type'
import { getXataClient } from '../xata'

const x = () => getXataClient().db.todos

const server = process.env.DETA_PROJECT_KEY
  ? ({
      create: (name: string) => x().create({ name }),
      getTodos: (done: boolean) =>
        x().getAll({ filter: { done: { $is: done } } }),
      setDone: (id: string, done: boolean) =>
        x().update(id, { done, updatedAt: new Date() }),
      rename: (id: string, name: string) =>
        x().update(id, { name, updatedAt: new Date() }),
      deleteForever: (id: string) => x().delete(id),
    } satisfies ServerImplementation)
  : undefined
export const xata = {
  name: 'Xata',
  slug: 'xata',
  icon: 'xata.svg',
  description: (
    <p>
      Xata.io is a serverless database designed for modern development. It
      easily integrates into the developer workflow, aiming to provide an
      optimal data experience for Github, Vercel, and Netlify based deployments
    </p>
  ),
  server,
} satisfies TodoProvider
