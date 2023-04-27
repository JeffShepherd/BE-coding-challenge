import parseJsonData from './parsers/jsonParser.js'
import parseCsvData from './parsers/csvParser.js'


processClickCounts('./data/encodes.csv','./data/decodes.json')
////
export async function processClickCounts(csvFilePath, jsonFilePath) {
  const initialClickCounts = await parseCsvData(csvFilePath)
  const shortLinks = Object.keys(initialClickCounts)
  const clickData = await parseJsonData(jsonFilePath)

}