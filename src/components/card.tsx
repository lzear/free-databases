import React, { ComponentProps } from 'react'

import style from './card.module.css'

export const Card = (props: ComponentProps<'div'>) => {
  return <div className={style.card} {...props} />
}

export const CardGrid = ({ children }: { children: React.ReactNode }) => {
  return <div className={style.grid}>{children}</div>
}
