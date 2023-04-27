import fs from 'fs'
import csv from 'csv-parser'

function parseCsvData(path) {
  return new Promise((resolve, reject) => {
    if (!path.endsWith('.csv')) {
      reject(new Error('Invalid file extension'))
      return
    }
    if (!fs.existsSync(path)) {
      reject(new Error('File does not exist'))
      return
    }

    const result = {}

    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (data) => {
        const { long_url, domain, hash } = data
        const shortLink = domain + '/' + hash
        result[shortLink] = {long_url, count: 0}
      })
      .on('error', (error) => {
        reject(error)
      })
      .on('end', () => {
        if (Object.keys(result).length === 0) {
          reject(new Error('Failed to parse CSV'))
        } else {
          resolve(result)
        }
      })

  })
}

export default parseCsvData