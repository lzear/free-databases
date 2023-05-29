// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript

const xmur3 = (string_: string): (() => number) => {
  let h = 1_779_033_703 ^ string_.length
  for (let index = 0; index < string_.length; index++) {
    const code = string_.codePointAt(index)
    if (code === undefined) continue
    h = Math.imul(h ^ code, 3_432_918_353)
    h = (h << 13) | (h >>> 19)
  }
  return (): number => {
    h = Math.imul(h ^ (h >>> 16), 2_246_822_507)
    h = Math.imul(h ^ (h >>> 13), 3_266_489_909)
    return (h ^= h >>> 16) >>> 0
  }
}

const mulberry32 = (a: number) => () => {
  let t = (a += 0x6d_2b_79_f5)
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296
}

export const rngGenerator: (seedString: string) => () => number = (
  seedString: string,
) => mulberry32(xmur3(seedString)())
