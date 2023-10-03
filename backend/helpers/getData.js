const fs = require('fs')
const path = require('path')

// get json data in the data folder
const getData = async (filename) => {
  const filepath = path.join(__dirname, `../data/${filename}`)
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf-8', (err, jsonString) => {
      if(err) reject(err)
      resolve(JSON.parse(jsonString))
    })
  })
}

module.exports = getData