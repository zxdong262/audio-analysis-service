/**
 * handle event not userful
 */

const env = process.env.NODE_ENV

export function handleEvent (evt) {
  return {
    statusCode: 200,
    body: JSON.stringify(evt)
  }
}

export function log(...args) {
  console.log(
    '' + new Date().toISOString(),
    ...args
  )
}

export function debug(...args) {
  if (env !== 'production') {
    console.log(
      '' + new Date(),
      ...args
    )
  }
}

/**
 * response helper
 */
export function result (
  msg,
  status = 200,
  options = {}
) {
  return {
    statusCode: status,
    body: msg,
    ...options
  }
}
