import { Router } from 'express'
import { createKitten, getKitten, updateKitten } from '../controllers/kitten.controller'

export const KittenRouter: Router = Router()

KittenRouter.get('/', getKitten)
KittenRouter.get('/:id', getKitten)
KittenRouter.post('/', createKitten)
KittenRouter.put('/:id', updateKitten)
