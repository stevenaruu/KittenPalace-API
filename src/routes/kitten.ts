import { Router, Request, Response, NextFunction } from 'express'

export const KittenRouter: Router = Router()

KittenRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: true, statusCode: 200, data: [{ name: 'zeta', coin: 99999 }] })
})
