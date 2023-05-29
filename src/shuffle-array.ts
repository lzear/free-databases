export const shuffleArray = <T>(_array: T[], rng: () => number): T[] => {
  const array = [..._array]
  let m = array.length
  let t
  let index

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    const r = rng()
    index = Math.floor(r * m--)
    t = array[m]
    array[m] = array[index]
    array[index] = t
  }
  return array
}
