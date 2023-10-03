const { expect, test } = require('@jest/globals')
const getData = require('./getData')

test('returns an array', async () => {
  const data = await getData('rewards.json')
  expect(Array.isArray(data)).toBe(true)
})