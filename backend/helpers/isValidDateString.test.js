const { expect, test } = require('@jest/globals')
const isValidDateString = require('./isValidDateString')

test('01-12-2020 ISO', () => {
  expect(isValidDateString('2020-12-01T12:00:00.000Z')).toBe(true)
})

test('01-12-2020 YYYY-MM-DD', () => {
  expect(isValidDateString('2020-12-01')).toBe(true)
})

test('invalid ISO string', () => {
  expect(isValidDateString('2020-12-01T12:00:00.000Zs')).toBe(false)
})

test('invalid month ISO', () => {
  expect(isValidDateString('2020-13-01T12:00:00.000Z')).toBe(false)
})

test('invalid date ISO', () => {
  expect(isValidDateString('2020-12-32T12:00:00.000Z')).toBe(false)
})