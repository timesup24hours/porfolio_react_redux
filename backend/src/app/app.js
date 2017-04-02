import app from './server'
import { mongoose } from '../db'
import { db as dbConfg, server as serverConfig } from '../../config'
import { logger } from '../util'

app.set('port', (process.env.PORT || serverConfig.PORT))
mongoose.connect(process.env.DB_HOST || dbConfg.host)
const db = mongoose.connection
db.on('error', () => logger.error('Failing to connect db!!!!!'))
db.once('open', () => {
  logger.info('Connected to mongodb server')
  logger.info('Connected to mongodb name: ', mongoose.connection.name)
  app.listen(app.get('port'), (err) => {
    logger.info('Express server is up on port ' + app.get('port'));
  })
})

// output all uncaught exceptions
process.on('uncaughtException', err => logger.error('uncaught exception:', err));
process.on('unhandledRejection', error => logger.error('unhandled rejection:', error));

export default app
