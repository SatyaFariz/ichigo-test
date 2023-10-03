const { expect, test } = require('@jest/globals')
const getNextDate = require('./getNextDate')

test('returns next date', () => {
  const date = new Date('2020-03-15T12:00:00.000Z')
  const nextDate = getNextDate(date)
  expect(nextDate.toISOString()).toBe('2020-03-16T12:00:00.000Z')
})