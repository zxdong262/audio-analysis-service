/**
 * check event type, send event to different event handler
 */

import textAnalysis from './text-analysis'
import urlAnalysis from './url-analysis'
import url2text from './url2text'
import {handleEvent, debug} from './common'
import _ from 'lodash'

const mapper = {
  'text-analysis': textAnalysis,
  'audio-url-analysis': urlAnalysis,
  'audio-url-to-text': url2text
}

export default event => {
  debug('----------event get--------------')
  debug(event)
  debug('-----------event get-------------')
  let { action = 'alien' } = event.pathParameters || {}
  let handler = mapper[action] || handleEvent
  event.body = event.body || {}
  if (_.isString(event.body)) {
    event.body = JSON.parse(event.body)
  }
  event.queryStringParameters = event.queryStringParameters || {}
  return handler(event)
}
