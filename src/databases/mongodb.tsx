import { MongoClient, ObjectId } from 'mongodb'

import { TodoProvider } from '@/todo-providers'

if (!process.env.MONGODB_URI) {
  throw new Error('Missing MONGODB_URI')
}
const client = new MongoClient(process.env.MONGODB_URI)

const connection = client.connect()

const getTodosCollection = async () => {
  const c = await connection
  return c.db('todos').collection<{
    _id?: ObjectId
    name: string
    done: boolean
    createdAt: Date
    updatedAt: Date
  }>('todos')
}

export const mongodb = {
  name: 'MongoDB Atlas',
  slug: 'mongodb',
  icon: 'mongodb.svg',
  description: (
    <p>
      MongoDB Atlas is a multi-cloud database service by the same people that
      build MongoDB. Atlas simplifies deploying and managing your databases
      while offering the versatility you need to build resilient and performant
      global applications on the cloud providers of your choice.
    </p>
  ),
  server: {
    getTodos: async (done) => {
      const collection = await getTodosCollection()
      const todos = await collection.find({ done }).toArray()
      return todos.map((todo) => ({ ...todo, id: todo._id.toHexString() }))
    },
    create: async (name) => {
      const collection = await getTodosCollection()
      const createdAt = new Date()
      return collection.insertOne({
        name,
        done: false,
        createdAt,
        updatedAt: createdAt,
      })
    },
    deleteForever: async (id) => {
      const collection = await getTodosCollection()
      return collection.deleteOne({ _id: new ObjectId(id) })
    },
    setDone: async (id, done) => {
      const collection = await getTodosCollection()
      return collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { done, updatedAt: new Date() } },
      )
    },
    rename: async (id, name) => {
      const collection = await getTodosCollection()
      return collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, updatedAt: new Date() } },
      )
    },
  },
} satisfies TodoProvider
