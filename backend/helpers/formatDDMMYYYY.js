// format DD-MM-YYYY (01-12-2020)
const formatDDMMYYYY = (dateString) => {
  const date = new Date(dateString)
  const currentMonth = date.getMonth() + 1
  const mm = currentMonth < 10 ? `0${currentMonth}` : currentMonth.toString()
  return `${date.getDate()}-${mm}-${date.getFullYear()}`
}

module.exports = formatDDMMYYYY