import chai from 'chai';
import { expect } from 'chai';
import parseJsonData from '../src/parsers/jsonParser.js'
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised)

describe('parseJsonData', function() {

  it('should be a function', async function() {
    await expect(parseJsonData).to.be.a('function')
  })

  it('should return an error for an incorrect file path', async function() {
    await expect(parseJsonData('./badFilePath.json')).to.be.rejectedWith(Error)
  })

  it('should return an error for an incorrect file extension', async function() {
    await expect(parseJsonData('./test/testData/testData.py')).to.be.rejectedWith(Error)
  })

  it('should return an array', async function() {
    const result = await parseJsonData('./test/testData/testData.json')
    expect(result).to.be.an('array')
  })

  it('should return an array full of objects', async function() {
    const result = await parseJsonData('./test/testData/testData.json')
    expect(result[0]).to.be.an('object')
    expect(result[10]).to.be.an('object')
  })

  it('should parse the json data but not alter it', async function() {
    const exampleResult = {
      bitlink: 'http://bit.ly/2kJdsg8',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36',
      timestamp: '2020-06-06T00:00:00Z',
      referrer: 'direct',
      remote_ip: '2.16.120.255'
    }
    const result = await parseJsonData('./test/testData/testData.json')
    expect(result[0].bitlink).to.equal(exampleResult.bitlink)
    expect(result[0].timestamp).to.equal(exampleResult.timestamp)
  })
})