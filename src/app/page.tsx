import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

import { shuffledProviders } from '@/app/shuffle-providers'
import { Badge } from '@/components/ui/badge'
import { GITHUB_REPO } from '@/site-data'
import { DeadProvider, TodoProvider } from '@/todo-providers'

export const dynamic = 'force-static'

// Revalidate every 2 hours
export const revalidate = 7200

const twCard =
  'hover:border hover:border-[rgba(var(--card-border-rgb),0.15)] hover:border-solid bg-[rgba(var(--card-rgb),0)] hover:bg-[rgba(var(--card-rgb),.1)] text-center relative min-w-0 rounded-xl border border-[rgba(var(--card-border-rgb),0)] transition duration-200  py-8 px-4 border-solid'

const MaybeLink = ({
  todoProvider,
  children,
  className,
}: {
  todoProvider: TodoProvider | DeadProvider
  children: React.ReactNode
  className: string
}) =>
  'dead' in todoProvider ? (
    <div className={twMerge(twCard, 'group', className)}>
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="rotate-[-30deg]  text-4xl  font-bold text-[orange]   opacity-60  transition-opacity duration-1000  group-hover:opacity-10">
          {todoProvider.dead}
        </div>
      </div>
      {children}
    </div>
  ) : (
    <Link href={`/${todoProvider.slug}`} className={twMerge(twCard, className)}>
      {children}
    </Link>
  )

const Home = () => (
  <main className="mx-auto my-0 flex min-h-dvh max-w-[var(--max-width)] flex-col items-center justify-between gap-12 p-16 px-4 text-center sm:px-12 sm:text-left">
    <div className="flex flex-col gap-5">
      <h1>Free databases 🙌</h1>
      <p className="">Some data storage costing nothing.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {shuffledProviders
        .filter((tp) => 'dead' in tp || tp.server)
        .map((tp) => (
          <MaybeLink key={tp.slug} todoProvider={tp} className="group">
            <h2 className="mb-2 flex items-center font-semibold sm:mb-3">
              <Image
                className={twMerge(
                  'relative mr-2 drop-shadow-[0_0_0.1rem_#ffffff]   dark:drop-shadow-[0_0_0.3rem_#ffffff70]',
                  tp.slug !== 'tembo' && 'dark:invert',
                )}
                src={`/${tp.icon}`}
                alt={`${tp.name} icon`}
                width={32}
                height={32}
              />
              {tp.name}
              <span className="ml-2 whitespace-nowrap transition-transform duration-200 group-hover:translate-x-1">
                {'dead' in tp ? '🪦' : '->'}
              </span>
            </h2>
            <div className="m-0 max-w-[35ch] text-center text-sm leading-normal opacity-60 sm:text-left">
              {tp.description}
            </div>
          </MaybeLink>
        ))}
    </div>
    <div>
      Source code available at{' '}
      <a href={GITHUB_REPO.URL}>
        <Badge className="align-bottom">
          <Github size={16} color={'#fff'} className="mr-2" />
          <span>{GITHUB_REPO.DISPLAY}</span>
        </Badge>
      </a>
    </div>
  </main>
)
export default Home
