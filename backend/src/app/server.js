import express from 'express'
import path from 'path'

import middlewares from '../middlewares'
import routes from '../routes'

const app = express()

middlewares(app)
routes(app)

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../../frontend/build', 'index.html'))
// })

export default app
