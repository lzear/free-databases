import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { shuffledProviders } from '@/app/shuffle-providers'
import { Badge } from '@/components/ui/badge'
import { GITHUB_REPO } from '@/site-data'
import { DeadProvider, TodoProvider } from '@/todo-providers'

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
        <div className={styles.discontinued}>{todoProvider.dead}</div>
      </div>
      {children}
    </div>
  ) : (
    <Link href={`/${todoProvider.slug}`} className={styles.card}>
      {children}
    </Link>
  )

const Home = () => (
  <main className={styles.main}>
    <h1 className="border border-black">Free databases 🙌</h1>

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
    <div className={'mt-16'}>
      Source code available at{' '}
      <a href={GITHUB_REPO.URL}>
        <Badge className="align-bottom">
          <Github size={16} color={'#fff'} className="mr-2" />
          <span>{GITHUB_REPO.DISPLAY}</span>
        </Badge>
      </a>
    </div>
  </main>
)
export default Home
