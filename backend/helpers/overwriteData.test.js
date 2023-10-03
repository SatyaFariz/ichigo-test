const { expect, test } = require('@jest/globals')
const overwriteData = require('./overwriteData')
const getData = require('./getData')

test('returns the same array', async () => {
  const filename = 'rewards.json'
  const data = await getData(filename)
  const overwrittenData = await overwriteData(filename, data)
  expect(overwrittenData).toBe(data)
})