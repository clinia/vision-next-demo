import express from 'express'
import next from 'next'
import nextI18NextMiddleware from 'next-i18next/middleware'
import nextI18next from '../config/i18n'
import * as dotenv from 'dotenv'

// env config
const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
}

const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

;(async () => {
  await app.prepare()
  const server = express()

  /* I18Next Middleware */
  server.use(nextI18NextMiddleware(nextI18next))

  /* Add catch-all GET for non-custom routes */
  server.get('*', (req, res) => handle(req, res))

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`)
})()
