import { Request, Response } from 'express'
import { createKittenValidation, updateKittenValidation } from '../validations/kitten.validation'
import { logger } from '../utils/logger'
import {
    addKittenToDB,
    deleteKittenById,
    getKittenById,
    getKittenFromDB,
    updateKittenById
} from '../services/kitten.service'
import { v4 as uuidv4 } from 'uuid'

export const createKitten = async (req: Request, res: Response) => {
    const kittens: any = await getKittenFromDB()
    req.body.kitten_id = uuidv4()
    if (kittens.length === 0) {
        req.body.id = 1
    } else {
        req.body.id = kittens.length + 1
    }
    console.log(req.body)
    const { error, value } = createKittenValidation(req.body)
    if (error) {
        logger.error(`ERR: kitten - create = ${error.details[0].message}`)
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
    }

    try {
        await addKittenToDB(value)

        logger.info('Success add new kitten')
        return res.status(201).send({ status: true, statusCode: 201, message: 'Add kitten success', data: value })
    } catch (err: any) {
        logger.error(`ERR: kitten - create = ${err}`)
        return res.status(422).send({ status: false, statusCode: 422, message: err.message })
    }
}

export const getKitten = async (req: Request, res: Response) => {
    const {
        params: { id }
    } = req

    if (id) {
        const kitten = await getKittenById(id)
        if (kitten) {
            logger.info('Success get kitten data')
            return res.status(200).send({ status: true, statusCode: 200, data: kitten })
        } else {
            logger.info('Kitten data not found')
            return res.status(404).send({ status: true, statusCode: 404, message: 'Kitten not found', data: {} })
        }
    } else {
        const kittens: any = await getKittenFromDB()
        logger.info('Success get kitten data')
        return res.status(200).send({ status: true, statusCode: 200, data: kittens })
    }
}

export const updateKitten = async (req: Request, res: Response) => {
    const {
        params: { id }
    } = req

    const { error, value } = updateKittenValidation(req.body)
    if (error) {
        logger.error(`ERR: kitten - update = ${error.details[0].message}`)
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
    }

    try {
        const result = await updateKittenById(id, value)
        if (result) {
            logger.info('Success update kitten data')
            return res.status(200).send({ status: true, statusCode: 200, message: 'Update kitten success' })
        } else {
            logger.info('Kitten data not found')
            return res.status(404).send({ status: true, statusCode: 404, message: 'Kitten not found' })
        }
    } catch (err: any) {
        logger.error(`ERR: kitten - update = ${err}`)
        return res.status(422).send({ status: false, statusCode: 422, message: err.message })
    }
}

export const deleteKitten = async (req: Request, res: Response) => {
    const {
        params: { id }
    } = req

    try {
        const result = await deleteKittenById(id)
        if (result) {
            logger.info('Success delete kitten data')
            return res.status(200).send({ status: true, statusCode: 200, message: 'Delete kitten success' })
        } else {
            logger.info('Kitten data not found')
            return res.status(404).send({ status: true, statusCode: 404, message: 'Kitten not found' })
        }
    } catch (err: any) {
        logger.error(`ERR: kitten - delete = ${err}`)
        return res.status(422).send({ status: false, statusCode: 422, message: err.message })
    }
}
