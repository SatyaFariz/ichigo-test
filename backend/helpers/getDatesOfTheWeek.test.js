const { expect, test } = require('@jest/globals')
const getDatesOfTheWeek = require('./getDatesOfTheWeek')

test('returns dates of the week', () => {
  const date = new Date('2020-03-15T12:00:00.000Z')

  const datesOfTheWeek = getDatesOfTheWeek(date)
  expect(datesOfTheWeek.length).toBe(7)
  expect(datesOfTheWeek[0]).toBe('2020-03-15T00:00:00.000Z')
  expect(datesOfTheWeek[1]).toBe('2020-03-16T00:00:00.000Z')
  expect(datesOfTheWeek[2]).toBe('2020-03-17T00:00:00.000Z')
  expect(datesOfTheWeek[3]).toBe('2020-03-18T00:00:00.000Z')
  expect(datesOfTheWeek[4]).toBe('2020-03-19T00:00:00.000Z')
  expect(datesOfTheWeek[5]).toBe('2020-03-20T00:00:00.000Z')
  expect(datesOfTheWeek[6]).toBe('2020-03-21T00:00:00.000Z')
})