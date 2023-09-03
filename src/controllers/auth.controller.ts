import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import { createSessionValidation, createUserValidation } from '../validations/auth.validation'
import { checkPassword, hashing } from '../utils/hashing'
import { createUser, findUserByEmail } from '../services/auth.service'
import { signJWT } from '../utils/jwt'

export const registerUser = async (req: Request, res: Response) => {
    req.body.user_id = uuidv4()
    const { error, value } = createUserValidation(req.body)
    if (error) {
        logger.error(`ERR: auth - register = ${error.details[0].message}`)
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
    }

    try {
        value.password = `${hashing(value.password)}`
        await createUser(value)

        logger.info('Success add register user')
        return res.status(201).send({ status: true, statusCode: 201, message: 'Success register user', data: value })
    } catch (err) {
        logger.error(`ERR: auth - register = ${err}`)
        return res.status(422).send({ status: false, statusCode: 422, message: err })
    }
}

export const createSession = async (req: Request, res: Response) => {
    const { error, value } = createSessionValidation(req.body)

    if (error) {
        logger.error(`ERR: auth - create session = ${error.details[0].message}`)
        return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message, data: {} })
    }

    try {
        const user: any = await findUserByEmail(value.email)
        const isValid = checkPassword(value.password, user.password)

        if (!isValid) {
            return res.status(401).json({ status: false, statusCode: 401, message: 'Invalid email or password' })
        }

        const accessToken = signJWT({ ...user }, { expiresIn: '1d' })

        return res.status(200).send({ status: true, statusCode: 200, message: 'Login success', data: { accessToken } })
    } catch (err: any) {
        logger.error(`ERR: auth - create session = ${err}`)
        return res.status(422).send({ status: false, statusCode: 422, message: err.message })
    }
}
