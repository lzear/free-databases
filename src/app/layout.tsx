import './globals.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import PlausibleProvider from 'next-plausible'
import React from 'react'

import { shuffledProviders } from '@/app/shuffle-providers'
import { FREE_DATABASES_DOMAIN } from '@/site-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: 'Free databases 🙌 | %s',
    default: 'Free databases 🙌',
  },
  description: 'Some data storage costing nothing',
  authors: [{ name: 'Antoine Clausse', url: 'https://www.elzear.de/' }],
  creator: 'Antoine Clausse',
  keywords: [
    'database',
    'databases',
    'Postgres',
    ...shuffledProviders.map((tp) => tp.name),
    'serverless',
    'free',
    'free tier',
  ],
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <PlausibleProvider domain={FREE_DATABASES_DOMAIN} />
    </head>
    <body className={inter.className}>{children}</body>
  </html>
)
export default RootLayout
