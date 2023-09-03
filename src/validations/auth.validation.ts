import Joi from 'joi'
import IUserInterface from '../types/user.type'

export const createUserValidation = (payload: IUserInterface) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        email: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().allow('', null)
    })

    return schema.validate(payload)
}

export const createSessionValidation = (payload: IUserInterface) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })

    return schema.validate(payload)
}

export const refreshSessionValidation = (payload: IUserInterface) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required()
    })

    return schema.validate(payload)
}
