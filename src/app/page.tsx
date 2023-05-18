import Image from 'next/image'
import Link from 'next/link'

import { NextDescription } from '../components/next-description'
import { Cookie } from '../data-providers/cookie'
import { PlanetScale } from '../data-providers/planetscale'
import { Supabase } from '../data-providers/supabase'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Todo-lists demo app</h1>

      <NextDescription>A playground to test a few backends</NextDescription>
      <div className={styles.grid}>
        <Link href={Cookie.path} className={styles.card}>
          <h2>
            <Image
              className={styles.logo}
              src="/cookie.png"
              alt="Cookie icon"
              width={32}
              height={32}
              priority
            />
            Cookie <span>-&gt;</span>
          </h2>
          <p>
            A cookie is a small text file stored on a user&apos;s browser by a
            website to remember information or preferences. It enables stateful
            interactions, like tracking user sessions, retaining login
            information, or personalizing user experiences.
          </p>
        </Link>
        {PlanetScale && (
          <Link href={PlanetScale.path} className={styles.card}>
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
            <p>Warning: the data are shared between all users.</p>
          </Link>
        )}
        {Supabase && (
          <Link href={Supabase.path} className={styles.card}>
            <h2>
              <Image
                className={styles.logo}
                src="/supabase.png"
                alt="Supabase Logo"
                width={32}
                height={32}
                priority
              />
              Supabase <span>-&gt;</span>
            </h2>
            <p>
              Supabase is an open-source alternative to Firebase, providing a
              backend-as-a-service with real-time database, authentication, and
              storage. It utilizes PostgreSQL and offers RESTful and real-time
              APIs for rapid application development.
            </p>
            <p>Warning: the data are shared between all users.</p>
          </Link>
        )}
      </div>
    </main>
  )
}
