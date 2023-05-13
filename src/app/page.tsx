import Image from 'next/image'
import Link from 'next/link'

import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Elzear&apos;s todos app</h1>

      <div className={styles.description}>
        <p>Todo app to test multiple backends</p>
      </div>
      <div className={styles.grid}>
        <Link
          href="/planetscale"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
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
