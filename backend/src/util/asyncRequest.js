import { logger } from './logger'

export const asyncRequest = (handler) =>
  (req, res, next) =>
    handler(req, res, next).catch(e => {
      logger.debug('Error during request:', e)
      res.status(400).send({error: e.toString()})
    })
