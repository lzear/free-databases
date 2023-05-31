import admin from 'firebase-admin'

import { SingletonUnique } from '../singletons'
import type { TodoProvider } from '../todo-providers'
import type { ServerImplementation } from '../todos-server/type'

const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replaceAll(/\\n/gm, '\n')

const firestoreSingleton = new SingletonUnique(() => {
  const app =
    admin.apps.length === 0
      ? admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        })
      : admin.app()

  return admin.firestore(app).collection('todos')
})

const fire = () => firestoreSingleton.get()

const server =
  privateKey && clientEmail && projectId
    ? ({
        create: (name: string) => fire().add({ name, done: false }),
        getTodos: async (done: boolean) => {
          const todos = await fire().where('done', '==', done).get()
          return todos.docs.map((document) => {
            const data = document.data()
            return {
              id: document.id,
              done: !!data.done,
              name: data.name || '???',
              createdAt: document.createTime.toDate(),
              updatedAt: document.updateTime.toDate(),
            }
          })
        },
        setDone: (id: string, done: boolean) => fire().doc(id).update({ done }),
        rename: (id: string, name: string) => fire().doc(id).update({ name }),
        deleteForever: (id: string) => fire().doc(id).delete(),
      } satisfies ServerImplementation)
    : undefined

export const firebase = {
  name: 'Firebase',
  slug: 'firebase',
  icon: 'firebase.svg',
  description: (
    <p>
      Firebase is a platform developed by Google for creating mobile and web
      applications, providing tools and services to build, improve, and grow
      your app. It offers a multitude of services including a real-time NoSQL
      database (Firestore), user authentication, cloud storage, hosting, machine
      learning, and serverless functions (Cloud Functions).
    </p>
  ),
  server,
} satisfies TodoProvider
