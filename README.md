# audio-analysis-service
audio analysis service.

## Features
- Read audio stream from url and transcript to text with google cloud api
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

## Use
- `/text-analysis?text=text` for text analysis, including **Sentiment**, **Syntax:**, **Classification:**, **Entity sentiment:**.
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
## Test
```bash
yarn test
```


## Build and deploy to aws lamda

- **ONLY works in linux**, you could run local dev server in any os, but aws lamda is in linux x64, some dependencies need to be prebuilt and upload to lamda, so need the build process in linux x64, you could do it in ci or any linux server/destop env.

- Get a aws account, create aws_access_key_id and aws_secret_access_key, put it in `~/.aws/credentials`, like this:
```bash
[default]
aws_access_key_id = <your aws_access_key_id>
aws_secret_access_key = <your aws_secret_access_key>
```
refer to https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html.


```bash
# create serverless.yml
cp lamda/serverless.sample.yml lamda/serverless.yml
```
edit `lamda/serverless.yml`, make sure you set proper name and required env
```yml
# you can define service wide environment variables here
  environment:
    NODE_ENV: production

    ## for google cloud api crendential path
    GOOGLE_APPLICATION_CREDENTIALS: your-google-credential-path

```

```bash
# then run this cmd to deploy to aws lamda, full build, may take more time
npm run deploy

## watch lamda server log
npm run watch

## update function
npm run update

## update without build, fast update, no rebuild
npm run u
```

### Extra deploy steps
To make it work in aws lamda, need extra setting in your lamda console

- Create api gateway for your lamda function, shape as `https://xxxx.execute-api.us-east-1.amazonaws.com/default/poc-your-bot-name-dev-bot/{action+}`
- Make sure your lamda function's timeout more than 3 minutes
- That is it.

## License
MIT

