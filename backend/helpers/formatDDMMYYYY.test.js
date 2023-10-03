const { expect, test } = require('@jest/globals')
const formatDDMMYYYY = require('./formatDDMMYYYY')

test('01-12-2020 ISO', () => {
  expect(formatDDMMYYYY('2020-12-01T12:00:00.000Z')).toBe('01-12-2020')
})

test('10-12-2020 ISO', () => {
  expect(formatDDMMYYYY('2020-12-10T12:00:00.000Z')).toBe('10-12-2020')
})

test('10-01-2020 ISO', () => {
  expect(formatDDMMYYYY('2020-01-10T12:00:00.000Z')).toBe('10-01-2020')
})

test('01-01-2020 ISO', () => {
  expect(formatDDMMYYYY('2020-01-01T12:00:00.000Z')).toBe('01-01-2020')
})

test('2020-12-28 YYYY-MM-DD', () => {
  expect(formatDDMMYYYY('2020-12-28T12:00:00.000Z')).toBe('28-12-2020')
})