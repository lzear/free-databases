'use client'

import { useParams } from 'next/navigation'
import React from 'react'

import ErrorComponent from '../../components/error'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const slug = useParams()['database'] as string | undefined

  return <ErrorComponent error={error} slug={slug} reset={reset} />
}
export default Error
