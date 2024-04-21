import { Inter } from 'next/font/google'
import Link from 'next/link'
import React, { ComponentProps, PropsWithChildren } from 'react'

import styles from './next-description.module.css'

export const NextDescription = (props: ComponentProps<'p'>) => (
  <div className={styles.description}>
    <div {...props} />
  </div>
)

const inter = Inter({ subsets: ['latin'] })

export const Nav: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.description}>
    <div>
      <div>
        <p>{children}</p>
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
