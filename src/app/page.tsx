import Image from 'next/image'
import Link from 'next/link'

import { NextDescription } from '../components/next-description'
import { todoProvidersArray } from '../todo-providers'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Todo-lists demo app</h1>

      <NextDescription>A playground to test a few backends</NextDescription>
      <div className={styles.grid}>
        {todoProvidersArray
          .filter((tp) => tp.isAvailable)
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
    </main>
  )
}
