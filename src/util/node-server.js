import Express from 'express'
import bodyParser from 'body-parser'
import { Nuxt, Builder } from 'nuxt'
import axios from 'axios'
import './globalProp'
import './globalFunc'

const app = new Express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === production)

// Instantiate nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode with hot-reloading
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build().catch(err => {
    logger.error(`error in builder.build, error info is ${err}`) // eslint-disable-line no-console
    process.exit(1)
  })
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/raphael/services/*', async (req, res) => {
  try {
    const originalUrl = req.originalUrl
    const host = req.get('host')
    let baseUrl
    const newUrl = originalUrl.replace('/raphael/services', '')
    if (config.dev) {
      baseUrl = `http://10.128.71.250:7300/mock/59c36698c0d77e1f243f945c/design${newUrl}`
    } else {
      baseUrl = `${host}${newUrl}`
    }
    const method = req.method.toLocaleLowerCase()
    const requestBody = req.body
    const requestConfig = {
      headers: req.headers,
      data: requestBody,
      timeout: 3000,
    }
    const response = await axios[method](baseUrl, requestConfig)
    res.set('Access-Control-Allow-Origin', '*')
    res.json(response.data)
    res.end()
    return
  } catch (err) {
    logger.error(`error in request raphael services, error info is ${err.stack}`)
  }
})

app.use(nuxt.render)

app.on('error', (err, ctx) => {
  logger.error('===>opps server error, error info is', err, ctx)
})

app.listen(port, '0.0.0.0')

logger.info('Server listening on ' + host + ':' + port)