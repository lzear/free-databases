'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import React, { useEffect } from 'react'

import { Databases, isDatabaseSlug } from '../databases'
import styles from '../todos/todos-page.module.css'
import { NextDescription } from './next-description'

const inter = Inter({ subsets: ['latin'] })

const ErrorComponent = ({
  error,
  reset,
  slug,
}: {
  error: Error
  reset: () => void
  slug?: string
}) => {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <main className={styles.main}>
      <NextDescription>
        <div>
          {isDatabaseSlug(slug) && <p>CRUD demo using {Databases[slug]}</p>}
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

export default ErrorComponent
