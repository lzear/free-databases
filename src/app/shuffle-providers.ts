import { cookie } from '@/databases/cookie'
import { rngGenerator } from '@/rng-generator'
import { shuffleArray } from '@/shuffle-array'
import {
  deadProviders,
  todoProvidersArrayWithoutCookie,
} from '@/todo-providers'

const rng = rngGenerator(new Date().toISOString().split('T')[0])

export const shuffledProviders = [
  ...shuffleArray(todoProvidersArrayWithoutCookie, rng),
  ...shuffleArray(deadProviders, rng),
  cookie,
]
