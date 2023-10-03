// format DD-MM-YYYY (01-12-2020)
const formatDDMMYYYY = (dateString) => {
  const date = new Date(dateString)
  const currentMonth = date.getMonth() + 1
  const currentDay = date.getDate()
  const dd = currentDay < 10 ? `0${currentDay}` : currentDay.toString()
  const mm = currentMonth < 10 ? `0${currentMonth}` : currentMonth.toString()
  return `${dd}-${mm}-${date.getFullYear()}`
}

module.exports = formatDDMMYYYY