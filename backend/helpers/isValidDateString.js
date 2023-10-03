// validate date string
const isValidDateString = (dateString) => {
  return !isNaN(Date.parse(dateString))
}

module.exports = isValidDateString