'use client'

import React from 'react'

import ErrorComponent from '../../components/error'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return <ErrorComponent error={error} slug="cookie" reset={reset} />
}
