import { Router } from 'express'
import { createKitten, deleteKitten, getKitten, updateKitten } from '../controllers/kitten.controller'
import { requireAdmin } from '../middleware/auth'

export const KittenRouter: Router = Router()

KittenRouter.get('/', getKitten)
KittenRouter.get('/:id', getKitten)
KittenRouter.post('/', requireAdmin, createKitten)
KittenRouter.put('/:id', requireAdmin, updateKitten)
KittenRouter.delete('/:id', requireAdmin, deleteKitten)
