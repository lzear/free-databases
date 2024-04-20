import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { cookie } from '@/databases/cookie'
import { rngGenerator } from '@/rng-generator'
import { shuffleArray } from '@/shuffle-array'
import {
  DeadProvider,
  deadProviders,
  TodoProvider,
  todoProvidersArrayWithoutCookie,
} from '@/todo-providers'

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

const rng = rngGenerator(new Date().toISOString().split('T')[0])
const shuffledProviders = [
  ...shuffleArray(todoProvidersArrayWithoutCookie, rng),
  ...shuffleArray(deadProviders, rng),
  cookie,
]

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
    <div className={'mt-16'}>
      Source code available at{' '}
      <a href="https://github.com/lzear/free-databases">
        <Badge
          // color={'#f00'}
          // variant={'destructive'}
          className="align-bottom"
        >
          <Github size={16} color={'#fff'} className="mr-2" />
          <span>lzear/free-databases</span>
        </Badge>
      </a>
    </div>
  </main>
)
export default Home
