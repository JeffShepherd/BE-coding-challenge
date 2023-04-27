import fs from 'fs'

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