export type TodoDto = {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  done: boolean
}

export type Todo = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  done: boolean
}

export type ServerImplementation = {
  getTodos: (done: boolean) => Promise<Array<Todo | TodoDto>>
  create: (name: string) => Promise<unknown>
  deleteForever: (id: string) => Promise<unknown>
  rename: (id: string, name: string) => Promise<unknown>
  setDone: (id: string, value: boolean) => Promise<unknown>
}

export const todoToDto = (todo: Todo | TodoDto) => ({
  ...todo,
  createdAt: new Date(todo.createdAt).toISOString(),
  updatedAt: new Date(todo.updatedAt).toISOString(),
})
