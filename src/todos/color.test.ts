import { randomColor } from './color'

describe(randomColor, () => {
  it('gives black color if L is 0', () => {
    expect(randomColor('', 256, 0)).toBe('#000000')
    expect(randomColor('aaaaa', 100, 0)).toBe('#000000')
    expect(randomColor('     ', 0, 0)).toBe('#000000')
  })

  it('gives white color if L is 100', () => {
    expect(randomColor('', 0, 100)).toBe('#ffffff')
    expect(randomColor('aaaaa', 0, 100)).toBe('#ffffff')
    expect(randomColor('     ', 0, 100)).toBe('#ffffff')
  })

  it('gives gray if S is 0', () => {
    expect(randomColor('', 0, 50)).toBe('#777777')
    expect(randomColor('aaaaa', 0, 20)).toBe('#303030')
    expect(randomColor('     ', 0, 60)).toBe('#919191')
  })

  it('works in general', () => {
    expect(randomColor('', 50, 50)).toBe('#bc566e')
    expect(randomColor('a', 50, 50)).toBe('#727b52')
    expect(randomColor('b', 50, 50)).toBe('#717b52')
    expect(randomColor('c', 50, 50)).toBe('#717c52')
  })
})
