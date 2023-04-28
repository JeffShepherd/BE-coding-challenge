import parseJsonData from './parsers/jsonParser.js'
import parseCsvData from './parsers/csvParser.js'

////master function is invoked once and passed the file paths of the provided data files
processClickCounts('./data/encodes.csv','./data/decodes.json')

///master function that calls functions to parse data from the provided files, mutates that data into
//the desired format, and returns it via console log
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

////takes data parsed from the provided files and finds the items that matched the provided criteria
export function countValidClicks(clickCounts, shortLinks, clickData) {
  for(const data of clickData) {
    const domainWithHash = data.bitlink.split('//')[1]

    if(shortLinks.includes(domainWithHash) && data.timestamp.startsWith('2021')) {
      clickCounts[domainWithHash].count ++
    }
  }
  return clickCounts
}

////reformats data from an object used to track click counts and returns an array of objects
export function formatResult(updatedClickCounts) {
  return Object.values(updatedClickCounts)
    .map(({ long_url, count }) => ({[long_url]: count }))
}

////sorts the array of objects by numical count value
export function sortFinalCount(finalCount) {
  return [...finalCount].sort((a,b) => Object.values(b)[0] - Object.values(a)[0])
}