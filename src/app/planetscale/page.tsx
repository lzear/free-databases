import styles from './page.module.css'
import { Todos } from './todos'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Todos – PlanetScale</h1>
      {/* @ts-expect-error Server Component */}
      <Todos />
    </main>
  )
}
