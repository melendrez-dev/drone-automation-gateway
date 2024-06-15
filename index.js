const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const compression = require('compression')
const { default: helmet } = require('helmet')
const rateLimit = require('express-rate-limit')
const apiRouter = require('./routes')
require('dotenv').config()

const app = express()

app.use(cors())

app.use(compression())

app.use(helmet())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.disable('x-powered-by')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 200, // Different limits for production and development
  standardHeaders: true, // Uses the `RateLimit` header
  legacyHeaders: false // Disables `X-RateLimit-*` headers
})

app.use(limiter)

app.use(
  logger('dev', {
    skip: () => process.env.NODE_ENV === 'production'
  })
)

app.get('/', (req, res) => {
  res.json({ message: 'Drone Automation Gateway V1.0.' })
})

app.use('/api', apiRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`)
})
