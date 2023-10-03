const fs = require('fs')
const path = require('path')

// overwrite json data in the data folder
const overwriteData = async (filename, data) => {
  const filepath = path.join(__dirname, `../data/${filename}`)
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, JSON.stringify(data), (err) => {
      if(err) reject(err)
      resolve(data)
    });
  })
}

module.exports = overwriteData