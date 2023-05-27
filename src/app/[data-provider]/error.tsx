'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

import { NextDescription } from '../../components/next-description'
import {
  DataProviders,
  isDataProviderSlug,
} from '../../data-providers/data-providers'
import styles from '../../todos/todos-page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Error({
  error,
  reset,
  params,
  ...r
}: {
  error: Error
  reset: () => void
  params?: { 'data-provider'?: string }
}) {
  const slug = useParams()['data-provider'] as string | undefined

  useEffect(() => {
    // Log the error to an error reporting service
    console.log('12')
    console.error(error)
  }, [error])
  return (
    <main className={styles.main}>
      <NextDescription>
        <div>
          {isDataProviderSlug(slug) && (
            <p>Todolist using data from {DataProviders[slug]}</p>
          )}
          <h2 className={styles.descriptionH2}>
            <Link href="/" className={inter.className}>
              <span>&lt;-</span> Home
            </Link>
          </h2>
        </div>
      </NextDescription>
      <div>
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
