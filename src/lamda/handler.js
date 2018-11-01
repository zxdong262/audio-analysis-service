global.Promise = require('bluebird')

const hub = require('./lib/hub').default

exports.audio = async function (event) {
  try {
    return hub(event)
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        event,
        error: e.stack
      })
    }
  }
}
