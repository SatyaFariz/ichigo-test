// get dates (sunday - saturday) of the week of a specified date
const getDatesOfTheWeek = (referenceDate) => {
  return Array.from(Array(7).keys()).map((idx) => {
    const date = new Date(referenceDate)
    date.setUTCHours(0,0,0,0)
    date.setDate(referenceDate.getDate() - referenceDate.getDay() + idx)
    return date.toISOString()
  })
}

module.exports = getDatesOfTheWeek