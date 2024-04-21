import { OctagonX } from 'lucide-react'

import { Nav } from '@/components/next-description'
import styles from '@/todos/todos-page.module.css'

const NotFound = () => {
  return (
    <main className={styles.main}>
      <Nav>
        <h4 className="flex items-center gap-2 text-red-600">
          <OctagonX />
          Page not found
        </h4>
      </Nav>
    </main>
  )
}

export default NotFound
