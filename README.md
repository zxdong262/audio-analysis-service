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
cd audio-analysis-service
yarn

# create config
cp .sample.env .env
# then edit .env, fill ringcentral app configs

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

# use pm2
pm2 start bin/pm2.yml
```

## Test
```bash
yarn test
```

## License
MIT

