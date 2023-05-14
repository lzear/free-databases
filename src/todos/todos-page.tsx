import 'server-only'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

import { NextDescription } from '../components/next-description'
import { DataProvider } from '../data-providers/data-providers'
import { todoProviders } from '../data-providers/todo-providers'
import { TodoEdit } from './todo-edit'
import { TodoList } from './todos'
import styles from './todos-page.module.css'

const inter = Inter({ subsets: ['latin'] })

export const TodosPage = ({ provider }: { provider: DataProvider }) => {
  return (
    <main className={styles.main}>
      <NextDescription>
        <div>
          <p>Todolist using data from {todoProviders[provider].name}</p>
          <h2 className={styles.descriptionH2}>
            <Link href="/" className={inter.className}>
              <span>&lt;-</span> Home
            </Link>
          </h2>
        </div>
      </NextDescription>

      {/* @ts-expect-error Server Component */}
      <TodoList
        provider={provider}
        done={false}
        title="To do"
        prepend={<TodoEdit provider={provider} />}
      />

      {/* @ts-expect-error Server Component */}
      <TodoList provider={provider} done={true} title="Done" />
    </main>
  )
}
