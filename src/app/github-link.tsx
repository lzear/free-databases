'use client'

import { Tag } from 'primereact/tag'
import React from 'react'

export const GithubLink = ({ children }: { children: React.ReactNode }) => {
  return <Tag className="mr-2" icon="pi pi-github" value={children} />
}
