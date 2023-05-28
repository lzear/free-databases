'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

import { NextDescription } from '../../components/next-description'
import { Databases, isDatabaseSlug } from '../../databases'
import styles from '../../todos/todos-page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const slug = useParams()['database'] as string | undefined

  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <main className={styles.main}>
      <NextDescription>
        <div>
          {isDatabaseSlug(slug) && (
            <p>Todolist using data from {Databases[slug]}</p>
          )}
          <h2 className={styles.descriptionH2}>
            <Link href="/" className={inter.className}>
              <span>&lt;-</span> Home
            </Link>
          </h2>
        </div>
      </NextDescription>
      <div style={{ marginTop: 90 }}>
        <h2>Something went wrong!</h2>

        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </main>
  )
}
