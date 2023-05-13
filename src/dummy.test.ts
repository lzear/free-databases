it('sums numbers 🤪', () => {
  expect(0.1 + 0.2).toEqual(0.300_000_000_000_000_04)
  expect(0.1 + 0.2).toBeCloseTo(0.3)
})
