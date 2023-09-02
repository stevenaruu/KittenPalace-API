import { Request, Response } from 'express'
import { createKittenValidation, updateKittenValidation } from '../validations/kitten.validation'
import { logger } from '../utils/logger'
import { addKittenToDB, getKittenById, getKittenFromDB, updateKittenById } from '../services/kitten.service'
import { v4 as uuidv4 } from 'uuid'

export const createKitten = async (req: Request, res: Response) => {
    req.body.kitten_id = uuidv4()
    const { error, value } = createKittenValidation(req.body)
    if (error) {
        logger.error(`ERR: kitten - create = ${error.details[0].message}`)
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
    }

    try {
        await addKittenToDB(value)

        logger.info('Success add new kitten')
        return res.status(201).send({ status: true, statusCode: 201, message: 'Add kitten success', data: value })
    } catch (err) {
        logger.error(`ERR: kitten - create = ${err}`)
        return res.status(422).send({ status: false, statusCode: 422, message: err })
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
        await updateKittenById(id, value)
        logger.info('Success update kitten data')
        return res.status(200).send({ status: true, statusCode: 200, message: 'Update kitten success', data: value })
    } catch (err) {
        logger.error(`ERR: kitten - update = ${err}`)
        return res.status(422).send({ status: false, statusCode: 422, message: err })
    }
}
