import fs from 'fs'

////reads a JSON file at the path provided and parses it, which it returns as a Promise
const parseJsonData = (path) => {
  return new Promise((resolve, reject) => {

    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err)
      } else {
        const jsonData = JSON.parse(data)
        resolve(jsonData)
      }
    })

  })
}

export default parseJsonData