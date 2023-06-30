import 'server-only'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

import { NextDescription } from '../components/next-description'
import { DatabaseSlug } from '../databases'
import { todoProviders } from '../todo-providers'
import { TodoEdit } from './todo-edit'
import { TodoList } from './todos'
import styles from './todos-page.module.css'

const inter = Inter({ subsets: ['latin'] })

export const TodosPage = ({ provider }: { provider: DatabaseSlug }) => {
  const todoProvider = todoProviders[provider]
  if (!todoProvider) throw new Error(`Unknown provider ${provider}`)
  return (
    <main className={styles.main}>
      <NextDescription>
        <div>
          <p>CRUD demo using {todoProvider.name}</p>
          <h2 className={styles.descriptionH2}>
            <Link href="/" className={inter.className}>
              <span>&lt;-</span> Home
            </Link>
          </h2>
        </div>
      </NextDescription>

      <TodoList
        provider={provider}
        done={false}
        title="To do"
        prepend={<TodoEdit provider={provider} />}
      />

      <TodoList provider={provider} done={true} title="Done" />
    </main>
  )
}
