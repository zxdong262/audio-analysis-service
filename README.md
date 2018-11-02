# audio-analysis-service
Audio convert/analysis service.

## Features
- Read audio stream from url, convert to flac format, transcript to text with google cloud api
- Analysis text with google cloud NLP api

## Prerequisites
- nodejs >= 8.10
- register google cloud account and set payment method, download your credential json.

## dev
```bash
git clone git@github.com:zxdong262/audio-analysis-service.git
#or git clone https://github.com/zxdong262/audio-analysis-service.git
cd audio-analysis-service

# install dependencies
yarn

# create config
cp .sample.env .env
# then edit .env, fill your google credential path

## start local server
yarn dev

```
## Build and Run in production env
```bash
# install pm2 first if you wanna use pm2
yarn global add pm2
# or `npm i -g pm2`

# build
yarn build

# run production server
yarn prod-server

# or use pm2
pm2 start bin/pm2.yml
```

## Use as service
- `/text-analysis?text=text` for text analysis, including **Sentiment**, **Syntax**, **Classification**, **Entity sentiment**.
- `/audio-url-to-text` transcript audio url to text with google cloud ai.
- `/audio-url-analysis` for audio url analysis, will transform to flac first, then transcript to text, then use google cloud ai to anlaysis.


```js

  it('text-analysis', function(done) {
    let text = encodeURIComponent('Hi! My name is Joanna. I will read any text you type here')
    fetch(`${base}/text-analysis?text=${text}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        expect(!!res.text).equal(true)
        done()
      })
  })

  it('audio-url-analysis', function(done) {
    fetch(`${base}/audio-url-analysis`, {
      method: 'post',
      body: JSON.stringify({
        url: `${base}/sample.mp3`,
        //set headers for auth when needed
        //headers: {}
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
  })

  it('audio-url-to-text', function(done) {
    fetch(`${base}/audio-url-to-text`, {
      method: 'post',
      body: JSON.stringify({
        url: `${base}/sample.mp3`,
        //set headers for auth when needed
        //headers: {AuthCode....}
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
  })
```


## Use as lib

```bash
npm i audio-analysis-service
```

```js
import {textAnalysis} from 'audio-analysis-service/src/lamda/lib/text-analysis'
import {speech2text} from 'audio-analysis-service/src/lamda/lib/url2text'
import {toFlac} from 'audio-analysis-service/src/lamda/lib/voice-to-flac'
import urlAnalysis from 'audio-analysis-service/src/lamda/lib/url-analysis'
```

## Test
```bash
yarn test
```

## License
MIT

