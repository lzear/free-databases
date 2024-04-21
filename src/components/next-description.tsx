import { Inter } from 'next/font/google'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

import styles from '@/todos/todos-page.module.css'

import styles2 from './next-description.module.css'

const inter = Inter({ subsets: ['latin'] })

const Nav: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={styles2.description}>
    <div>
      <div className="flex flex-col gap-2">
        <div>{children}</div>
        <h2 className="group mt-2.5 block">
          <Link href="/" className={inter.className}>
            <span className="inline-block duration-200 group-hover:-translate-x-1">
              &lt;-
            </span>{' '}
            Home
          </Link>
        </h2>
      </div>
    </div>
  </div>
)

export const MainNav: React.FC<PropsWithChildren<{ top: React.ReactNode }>> = ({
  children,
  top,
}) => (
  <main className={styles.main}>
    <Nav>{top}</Nav>
    {children}
  </main>
)
