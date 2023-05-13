import Image from 'next/image'
import Link from 'next/link'

import { NextDescription } from '../components/next-description'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Todo-lists demo app</h1>

      <NextDescription>A playground to test a few backends</NextDescription>
      <div className={styles.grid}>
        <Link href="/planetscale" className={styles.card}>
          <h2>
            <Image
              className={styles.logo}
              src="/planetscale.svg"
              alt="PlanetScale Logo"
              width={32}
              height={32}
              priority
            />
            PlanetScale <span>-&gt;</span>
          </h2>
          <p>
            PlanetScale is a serverless database platform using Vitess for
            scalable MySQL management. It provides horizontal scaling, high
            availability, and global data distribution.
          </p>
        </Link>
      </div>
    </main>
  )
}
