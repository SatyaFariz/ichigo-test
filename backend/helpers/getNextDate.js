// get next date from a specified date
const getNextDate = (referenceDate) => {
  const date = new Date(referenceDate)
  date.setDate(date.getDate() + 1)
  return date
}

module.exports = getNextDate