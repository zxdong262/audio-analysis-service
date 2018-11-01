/**
 * transcript audio url stream to flac
 * use google speech api to convert flac data to text
 */

import speech from '@google-cloud/speech'
import {toFlac} from './voicemail-to-flac'
import {log, debug} from './log'
import result from './response'

// Creates a client
const client = new speech.SpeechClient()

export async function speech2text (url, headers) {

  debug('url to text :', url, headers)
  let str = await toFlac(url, headers)
  const audio = {
    content: str
  }

  const config = {
    encoding: 'FLAC',
    sampleRateHertz: 16000,
    languageCode: 'en-US'
  }

  const request = {
    config,
    audio: audio
  }

  // Detects speech in the audio file
  let final = await client
    .recognize(request)
    .then(data => {
      const response = data[0]
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n')
      log(url, 'Transcription: ', transcription)
      return transcription
    })
    .catch(err => {
      log('speech to text ERROR:', err)
    })
  debug('url to text result:', final)
  return final
}

export default async (event) => {
  const {
    url,
    headers = {}
  } = event.body
  if (!url) {
    return result('url required', 400)
  }
  let text = await speech2text(url, headers)
  return result(text)
}
