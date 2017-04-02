import test from 'tape'
import app from '../src/app/app'
import routes from './routes'
import { test as testConfig } from '../config'
import { logger } from '../src/util'
var mongoose = require('mongoose')

function clearDB() {
  for (var i in mongoose.connection.collections) {
    logger.info('clearing mongodb name: ', mongoose.connection.name)
    mongoose.connection.collections[i].remove()
  }
}

test('setup', (t) => {
  logger.info('starting clearing...')
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(testConfig.host, function (err) {
      if (err) {
        throw err
      }
      logger.info('mongoose.connection')
      return clearDB()
    })
  } else {
    clearDB()
  }
  t.end()
})

routes(app, test)

test('teardown', (t) => {
  mongoose.disconnect()
  logger.info('mongoose.disconnect()')
  t.end()
  // teardown goes here, call t.end() when finished
})
