require('dotenv').config()
const fetch = require('node-fetch')
const {expect} = require('chai')
const {
  port, host,
  pack: {
    name
  }
} = require('../src/server/app/config')

const base = process.env.BASEURL || `http://${host}:${port}`
const sampleUrl = process.env.SMAPLEURL || `${base}/sample.mp3`

describe(name, function() {

  this.timeout(500000)

  it('text-analysis', function(done) {
    let text = encodeURIComponent('Hi! My name is Joanna. I will read any text you type here')
    fetch(`${base}/text-analysis?text=${text}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        expect(!!res.text).equal(true)
        done()
      })
      .catch(done)
  })

  it('audio-url-analysis', function(done) {
    fetch(`${base}/audio-url-analysis`, {
      method: 'post',
      body: JSON.stringify({
        url: sampleUrl
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        expect(!!res.text).equal(true)
        done()
      })
      .catch(done)
  })

  it('audio-url-to-text', function(done) {
    fetch(`${base}/audio-url-to-text`, {
      method: 'post',
      body: JSON.stringify({
        url: sampleUrl
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.text())
      .then(res => {
        expect(res).includes('name is')
        done()
      })
      .catch(done)
  })
})
