import chai from 'chai';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { processClickCounts, countValidClicks, formatResult } from '../src/main.js'
import parseJsonData from '../src/parsers/jsonParser.js'
import parseCsvData from '../src/parsers/csvParser.js'
chai.use(chaiAsPromised)

const initialClickCounts = await parseCsvData('./test/testData/testData.csv')
const shortLinks = Object.keys(initialClickCounts)
const clickData = await parseJsonData('./test/testData/testData.json')
const updatedClickCounts = countValidClicks(initialClickCounts, shortLinks, clickData)
const finalCount = formatResult(updatedClickCounts)

describe('processClickCounts', function() {
  it('should be a function', async function() {
    await expect(processClickCounts).to.be.a('function')
  })

})


describe('countValidClicks', async function() {
  it('should be a function', async function() {
    await expect(countValidClicks).to.be.a('function')
  })

  it('should return an object', async function() {
    expect(updatedClickCounts).to.be.an('object')
  })

  it('should return the correct result with click counts for shortURL and year matches', async function() {
    const expected = {
      'bit.ly/31Tt55z': { long_url: 'https://google.com/', count: 2 },
      'bit.ly/2kJO0zS': { long_url: 'https://gb.com/', count: 2 },
      'bit.ly/2zkAHNs': { long_url: 'https://ter.com/', count: 4 },
      'bit.ly/2k3dsg8': { long_url: 'https://reddddit.com/', count: 1 }
    }
    expect(updatedClickCounts).to.deep.equal(expected)
  })
})


describe('formatResult', async function() {
  it('should be a function', async function() {
    await expect(formatResult).to.be.a('function')
  })

  it('should return an object', async function() {
    expect(finalCount).to.be.an('array')
  })

  it('should return the correct result with click counts for shortURL and year matches', async function() {
    const expected = [
      { 'https://google.com/': 2 },
      { 'https://gb.com/': 2 },
      { 'https://ter.com/': 4 },
      { 'https://reddddit.com/': 1 }
    ]
    expect(finalCount).to.deep.equal(expected)
  })
})