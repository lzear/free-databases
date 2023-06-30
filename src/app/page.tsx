import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { cookie } from '../databases/cookie'
import { rngGenerator } from '../rng-generator'
import { shuffleArray } from '../shuffle-array'
import {
  DeadProvider,
  deadProviders,
  TodoProvider,
  todoProvidersArrayWithoutCookie,
} from '../todo-providers'
import { GithubLink } from './github-link'
import styles from './page.module.css'

export const dynamic = 'force-static'

// Revalidate every 2 hours
export const revalidate = 7200

const MaybeLink = ({
  todoProvider,
  children,
}: {
  todoProvider: TodoProvider | DeadProvider
  children: React.ReactNode
}) =>
  'dead' in todoProvider ? (
    <div className={styles.card}>
      <div className={styles.deadmoji} aria-label="grave emoji">
        <div className={styles.discontinued}>DISCONTINUED</div>
      </div>
      {children}
    </div>
  ) : (
    <Link href={`/${todoProvider.slug}`} className={styles.card}>
      {children}
    </Link>
  )

export default function Home() {
  const salt = new Date().toISOString().split('T')[0]
  const shuffledProviders = [
    ...shuffleArray(todoProvidersArrayWithoutCookie, rngGenerator(salt)),
    ...deadProviders,
    cookie,
  ]
  return (
    <main className={styles.main}>
      <h1>Free databases 🙌</h1>

      <p style={{ marginBottom: 90 }}>Some data storage costing nothing.</p>

      <div className={styles.grid}>
        {shuffledProviders
          .filter((tp) => 'dead' in tp || tp.server)
          .map((tp) => (
            <MaybeLink key={tp.slug} todoProvider={tp}>
              <h2>
                <Image
                  className={styles.logo}
                  src={`/${tp.icon}`}
                  alt={`${tp.name} icon`}
                  width={32}
                  height={32}
                  priority
                />
                {tp.name}
                {'dead' in tp ? (
                  <span className={styles.moj}>🪦</span>
                ) : (
                  <>
                    {' '}
                    <span>-&gt;</span>
                  </>
                )}
              </h2>
              {tp.description}
            </MaybeLink>
          ))}
      </div>
      <p style={{ marginTop: 150 }}>
        Source code available at{' '}
        <a href="https://github.com/lzear/free-databases">
          <GithubLink>lzear/free-databases</GithubLink>
        </a>
      </p>
    </main>
  )
}
