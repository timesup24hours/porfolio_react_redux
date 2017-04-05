import express from 'express'

import middlewares from '../middlewares'
import routes from '../routes'

const app = express()

middlewares(app)
routes(app)

app.get('*', (req, res) => {
  res.sendFile('index.html')
})

export default app
