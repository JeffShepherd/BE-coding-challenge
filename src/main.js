import parseJsonData from './parsers/jsonParser.js'
import parseCsvData from './parsers/csvParser.js'


processClickCounts('./data/encodes.csv','./data/decodes.json')
////
export async function processClickCounts(csvFilePath, jsonFilePath) {
  const initialClickCounts = await parseCsvData(csvFilePath)
  const shortLinks = Object.keys(initialClickCounts)
  const clickData = await parseJsonData(jsonFilePath)
  

  const updatedClickCounts = countValidClicks(initialClickCounts, shortLinks, clickData)
  
}


////
export function countValidClicks(clickCounts, shortLinks, clickData) {
  for(let i=0; i<clickData.length; i++) {
    const domainWithHash = clickData[i].bitlink.split('//')[1]

    if(!shortLinks.includes(domainWithHash)) {
      continue
    } else if(clickData[i].timestamp.startsWith('2021')) {
      clickCounts[domainWithHash].count ++
    }
  }
  return clickCounts
}