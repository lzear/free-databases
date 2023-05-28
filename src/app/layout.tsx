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
  icons: {
    icon: { url: '/favicon.png', type: 'image/png' },
    shortcut: { url: '/favicon.png', type: 'image/png' },
  },
  keywords: [
    'database',
    'databases',
    'free',
    'free tier',
    'Postgres',
    'Aiven',
    'CockroachDB',
    'ElephantSQL',
    'FaunaDB',
    'Fly.io',
    'Neon',
    'PlanetScale',
    'Railway',
    'Supabase',
    'Turso',
    'Upstash',
    'Vercel',
    'Yugabyte',
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
