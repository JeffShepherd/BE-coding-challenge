import parseJsonData from './parsers/jsonParser.js'
import parseCsvData from './parsers/csvParser.js'


processClickCounts('./data/encodes.csv','./data/decodes.json')

////
export async function processClickCounts(csvFilePath, jsonFilePath) {
  try {
    const initialClickCounts = await parseCsvData(csvFilePath)
    const shortLinks = Object.keys(initialClickCounts)
    const clickData = await parseJsonData(jsonFilePath)
    
    const updatedClickCounts = countValidClicks(initialClickCounts, shortLinks, clickData)
    const finalCount = formatResult(updatedClickCounts)
    const sortedFinalCount = sortFinalCount(finalCount)

    console.log(JSON.stringify(sortedFinalCount))
  } catch(error) {
    console.error("Error occured during processing: ", error)
  } 
}

////
export function countValidClicks(clickCounts, shortLinks, clickData) {
  for(const data of clickData) {
    const domainWithHash = data.bitlink.split('//')[1]

    if(shortLinks.includes(domainWithHash) && data.timestamp.startsWith('2021')) {
      clickCounts[domainWithHash].count ++
    }
  }
  return clickCounts
}

////
export function formatResult(updatedClickCounts) {
  return Object.values(updatedClickCounts)
    .map(({ long_url, count }) => ({[long_url]: count }))
}

////
export function sortFinalCount(finalCount) {
  return [...finalCount].sort((a,b) => Object.values(b)[0] - Object.values(a)[0])
}