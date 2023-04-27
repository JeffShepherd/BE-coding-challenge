import chai from 'chai';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { processClickCounts, countValidClicks } from '../src/main.js'
import parseJsonData from '../src/parsers/jsonParser.js'
import parseCsvData from '../src/parsers/csvParser.js'
chai.use(chaiAsPromised)



describe('processClickCounts', function() {
  it('should be a function', async function() {
    await expect(processClickCounts).to.be.a('function')
  })



})


describe('countValidClicks', async function() {
  const initialClickCounts = await parseCsvData('./test/testData/testData.csv')
  const shortLinks = Object.keys(initialClickCounts)
  const clickData = await parseJsonData('./test/testData/testData.json')
  const result = countValidClicks(initialClickCounts, shortLinks, clickData)

  it('should be a function', async function() {
    await expect(countValidClicks).to.be.a('function')
  })

  it('should return an object', async function() {
    expect(result).to.be.an('object')
  })

  it('should return the correct result with click counts for shortURL and year matches', async function() {
    const expected = {
      'bit.ly/31Tt55z': { long_url: 'https://google.com/', count: 2 },
      'bit.ly/2kJO0zS': { long_url: 'https://gb.com/', count: 2 },
      'bit.ly/2zkAHNs': { long_url: 'https://ter.com/', count: 4 },
      'bit.ly/2k3dsg8': { long_url: 'https://reddddit.com/', count: 1 }
    }
    expect(result).to.deep.equal(expected)
  })


})