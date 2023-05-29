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
  create: (name: string) => Promise<any>
  deleteForever: (id: string) => Promise<any>
  rename: (id: string, name: string) => Promise<any>
  setDone: (id: string, value: boolean) => Promise<any>
}

export const todoToDto = (todo: Todo | TodoDto) => ({
  ...todo,
  createdAt: new Date(todo.createdAt).toISOString(),
  updatedAt: new Date(todo.updatedAt).toISOString(),
})
