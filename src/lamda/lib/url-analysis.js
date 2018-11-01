/**
 * read audio stream from url and convert it to flac,
 * and analysis with google ai
 */

import { speech2text } from './url2text'
import { textAnalysis } from './text-analysis'
import result from './response'

export default async (event) => {
  const {
    url,
    headers
  } = event.body

  let text = await speech2text(
    url, headers
  )

  let res = await textAnalysis(text)
  return result(res)
}
