const { expect, test } = require('@jest/globals')
const mapRewardResponse = require('./mapRewardResponse')


test('returns correct shape', () => {
  const data = {
    userId: '1',
    availableAt: "2020-03-15T00:00:00Z", 
    redeemedAt: null, 
    expiresAt: "2020-03-16T00:00:00Z"
  }

  const mapped = mapRewardResponse(data)
  expect(mapped).toStrictEqual({
    availableAt: "2020-03-15T00:00:00Z", 
    redeemedAt: null, 
    expiresAt: "2020-03-16T00:00:00Z"
  })
})