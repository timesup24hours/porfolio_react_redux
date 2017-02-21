import app from './server'
import { mongoose } from '../db'
import config from '../../config'
import { logger } from '../util'

app.set('port', (process.env.PORT || config.db.PORT))

mongoose.connect(config.db.host)
const db = mongoose.connection
db.on('error', () => logger.error('Failing to connect db!!!!!'))
db.once('open', () => logger.info('Connected to mongodb server'))

app.listen(app.get('port'), (err) => {
  logger.info('Express server is up on port ' + app.get('port'));
})

// output all uncaught exceptions
process.on('uncaughtException', err => logger.error('uncaught exception:', err));
process.on('unhandledRejection', error => logger.error('unhandled rejection:', error));
