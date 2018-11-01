/**
 * analysis text with google ai
 */

// Imports the Google Cloud client library
import language from '@google-cloud/language'
import {log, debug} from './log'
import result from './response'

// Instantiates a client
const client = new language.LanguageServiceClient()

export async function textAnalysis (text) {
  debug('analysis text:', text)
  const document = {
    content: text,
    type: 'PLAIN_TEXT'
  }

  // Detects the sentiment of the text
  let sentiment = await client
    .analyzeSentiment({ document })
    .then(results => {
      return results[0].documentSentiment
    })
    .catch(err => {
      log('Sentiment api ERROR:', err)
    })

  // syntax
  let syntax = await client
    .analyzeSyntax({ document })
    .then(results => {
      return results[0]
    })
    .catch(err => {
      log('syntax api ERROR:', err)
    })

  // Detects sentiment of entities in the document
  let entitySentiments = await client
    .analyzeEntitySentiment({ document })
    .then(results => {
      return results[0].entities
    })
    .catch(err => {
      log('entitySentiments api ERROR:', err)
    })

  // Classifies text in the document
  let classification = await client
    .classifyText({ document })
    .then(results => {
      return results[0]
    })
    .catch(err => {
      log('classifies ERROR:', err)
    })

  let res = {
    text,
    sentiment,
    syntax,
    entitySentiments,
    classification
  }
  debug('analysis text result:', res)
  return res
}

export default async (event) => {
  let {text = ''} = event.queryStringParameters
  if (!text) {
    return result('text required', 400)
  }
  let res = await textAnalysis(text)
  return result(res)
}
