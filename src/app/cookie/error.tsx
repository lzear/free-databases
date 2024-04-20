'use client'

import React from 'react'

import ErrorComponent from '../../components/error'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => (
  <ErrorComponent error={error} slug="cookie" reset={reset} />
)
export default Error
