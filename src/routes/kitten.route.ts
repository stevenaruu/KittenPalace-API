import { Router, Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { createKittenValidation } from '../validation/kitten.validation'

export const KittenRouter: Router = Router()

KittenRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get kitten data')
  return res.status(200).send({ status: true, statusCode: 200, data: [{ name: 'zeta', coin: 99999 }] })
})

KittenRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createKittenValidation(req.body)
  if (error) {
    logger.error(`ERR: kitten - create = ${error.details[0].message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
  }

  logger.info('Success add new kitten')
  return res.status(200).send({ status: true, statusCode: 200, message: 'Add kitten success', data: value })
})
