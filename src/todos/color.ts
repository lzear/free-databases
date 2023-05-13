import { Hsluv } from 'hsluv'

export const hsluvToHex = ([h, s, l]: [number, number, number]): string => {
  const hsluv = new Hsluv()
  hsluv.hsluv_h = h
  hsluv.hsluv_s = s
  hsluv.hsluv_l = l
  hsluv.hsluvToHex()
  return hsluv.hex
}

export const randomColor = (string_: string, s: number, l: number): string => {
  let hash = 0
  for (let index = 0; index < string_.length; index += 1)
    hash = (string_.codePointAt(index) || 0) + ((hash << 5) - hash)
  const h = hash % 360
  return hsluvToHex([h, s, l])
}
