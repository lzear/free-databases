import Image from 'next/image'
import Link from 'next/link'

import { todoProvidersArray } from '../todo-providers'
import { GithubLink } from './github-link'
import styles from './page.module.css'

export const metadata = {
  title: 'Free databases 🙌',
  description: 'Some data storage costing nothing',
  authors: [{ name: 'Antoine Clausse', url: 'https://www.elzear.de/' }],
  creator: 'Antoine Clausse',
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

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Free databases 🙌</h1>

      <p style={{ marginBottom: 90 }}>Some data storage costing nothing.</p>

      <div className={styles.grid}>
        {todoProvidersArray
          .filter((tp) => tp.server)
          .map((tp) => (
            <Link key={tp.slug} href={`/${tp.slug}`} className={styles.card}>
              <h2>
                <Image
                  className={styles.logo}
                  src={`/${tp.icon}`}
                  alt={`${tp.name} icon`}
                  width={32}
                  height={32}
                  priority
                />
                {tp.name} <span>-&gt;</span>
              </h2>
              {tp.description}
            </Link>
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
