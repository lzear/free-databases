import { ComponentProps } from 'react'

import styles from './next-description.module.css'

export const NextDescription = (props: ComponentProps<'p'>) => (
  <div className={styles.description}>
    <div {...props} />
  </div>
)
