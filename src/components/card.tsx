import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

const cardClass =
  'rounded-xl border border-solid border-[rgba(var(--card-border-rgb),0)] p-4 hover:backdrop-invert-[7%] hover:backdrop-contrast-200 hover:border-[rgba(var(--card-border-rgb),0.25)]'

export const Card = (props: ComponentProps<'div'>) => {
  return (
    <div
      {...props}
      className={twMerge(
        cardClass,
        props.className,
        // 'contrast-125'
      )}
    />
  )
}

export const CardLoading = () => {
  return (
    <div
      className={twMerge(
        cardClass,
        'center flex items-center justify-center bg-[#8881]',
      )}
    >
      <div className="lds-ring opacity-20">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
