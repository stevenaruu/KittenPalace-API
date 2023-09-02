import { Request, Response } from 'express'
import { createKittenValidation } from '../validations/kitten.validation'
import { logger } from '../utils/logger'

export const createKitten = (req: Request, res: Response) => {
    const { error, value } = createKittenValidation(req.body)
    if (error) {
        logger.error(`ERR: kitten - create = ${error.details[0].message}`)
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
    }

    logger.info('Success add new kitten')
    return res.status(200).send({ status: true, statusCode: 200, message: 'Add kitten success', data: value })
}

export const getKitten = (req: Request, res: Response) => {
    const kittens = [
        {
            name: 'Zeta',
            coin: 999
        },
        {
            name: 'Kuroo',
            coin: 20
        }
    ]

    const {
        params: { name }
    } = req

    if (name) {
        const filteredKitten = kittens.filter((kitten) => {
            if (kitten.name === name) {
                return kitten
            }
        })

        if (filteredKitten.length === 0) {
            logger.info('Kitten not found')
            return res.status(404).send({ status: false, statusCode: 404, data: {} })
        }

        logger.info('Success get kitten data')
        return res.status(200).send({ status: true, statusCode: 200, data: filteredKitten[0] })
    }

    logger.info('Success get kitten data')
    return res.status(200).send({ status: true, statusCode: 200, data: kittens })
}
