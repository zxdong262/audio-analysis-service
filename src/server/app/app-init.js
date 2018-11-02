import Koa from 'koa'
import mount from 'koa-mount'
import Bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import serve from 'koa-static'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
import compress from 'koa-compress'
import {log} from '../../lamda/lib/common'
import Router from 'koa-router'
import {audio} from '../../lamda/handler'
import config from './config'

const isProduction = process.env.NODE_ENV === 'production'
const cwd = process.cwd()
const app = new Koa()
const staticOption = () => ({
  maxAge: 1000 * 60 * 60 * 24 * 365,
  hidden: true
})

const bodyparser = Bodyparser()

export default function init() {

  // global middlewares
  app.keys = ['rc-bot:' + Math.random()]

  app.use(compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
  }))

  //get
  app.use(conditional())

  // add etags
  app.use(etag())

  app.use(
    mount('/', serve(cwd + '/bin', staticOption()))
  )

  // body
  app.use(bodyparser)

  if (!isProduction) {
    app.use(logger())
  }

  //global error handle
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch(e) {
      log('server error', e.stack)
      //500 page
      ctx.status = 500
      ctx.body = {
        stack: e.stack,
        message: e.message
      }
    }
  })

  //lamda handler wrapper
  let handler = async (ctx) => {
    let event = {
      headers: ctx.headers,
      queryStringParameters: ctx.query,
      body: ctx.request.body,
      path: ctx.path,
      pathParameters: ctx.params
    }
    let res = await audio(event)
    if (res.headers) {
      ctx.set(res.headers)
    }
    ctx.status = res.statusCode
    ctx.body = res.body
  }

  //routers
  let router = new Router()
  router.get('/', async ctx => {
    ctx.body = `${config.pack.name} server running`
  })
  router.get('/favicon.ico', async ctx => ctx.body = '')
  router.all('/:action', handler)

  app
    .use(router.routes())
    .use(router.allowedMethods())

  return app
}
