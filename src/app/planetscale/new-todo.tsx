'use client'

import { Button, Card, Textarea } from '@chakra-ui/react'

import { create } from './_actions'

export const NewTodo = () => {
  return (
    <form action={create}>
      <Card>
        <Textarea name="todo-name" />
        <Button type="submit">Submit</Button>
      </Card>
    </form>
  )
}
