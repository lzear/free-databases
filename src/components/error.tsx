'use client'

import React, { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Databases, isDatabaseSlug } from '@/databases'

import { MainNav } from './next-description'

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
    <MainNav
      top={isDatabaseSlug(slug) && <p>CRUD demo using {Databases[slug]}</p>}
    >
      <div className="mt-20 flex flex-col gap-5">
        <h2>Something went wrong!</h2>
        <div>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </div>
    </MainNav>
  )
}

export default ErrorComponent
