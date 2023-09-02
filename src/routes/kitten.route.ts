import { Router } from 'express'
import { createKitten, getKitten } from '../controllers/kitten.controller'

export const KittenRouter: Router = Router()

KittenRouter.get('/', getKitten)
KittenRouter.get('/:name', getKitten)
KittenRouter.post('/', createKitten)
