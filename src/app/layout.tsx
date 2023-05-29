import './globals.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import { Inter } from 'next/font/google'
import PlausibleProvider from 'next-plausible'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Free databases 🙌',
  description: 'Some data storage costing nothing',
  authors: [{ name: 'Antoine Clausse', url: 'https://www.elzear.de/' }],
  creator: 'Antoine Clausse',
  keywords: [
    'database',
    'databases',
    'Postgres',
    'Aiven',
    'CockroachDB',
    'Convex',
    'Deta',
    'ElephantSQL',
    'FaunaDB',
    'Fly.io',
    'Neon',
    'PlanetScale',
    'Railway',
    'Supabase',
    'TiDB',
    'Turso',
    'Upstash',
    'Vercel',
    'Yugabyte',
    'serverless',
    'free',
    'free tier',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="free-databases.vercel.app" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
