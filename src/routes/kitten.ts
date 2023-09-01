import { Router, Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export const KittenRouter: Router = Router()

KittenRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get kitten data')
  res.status(200).send({ status: true, statusCode: 200, data: [{ name: 'zeta', coin: 99999 }] })
})

KittenRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success add new kitten')
  res.status(200).send({ status: true, statusCode: 200, data: req.body })
})
