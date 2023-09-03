import Joi from 'joi'
import IKittenInterface from '../types/kitten.type'

export const createUserValidation = (payload: IKittenInterface) => {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        email: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().allow('', null)
    })

    return schema.validate(payload)
}

export const createSessionValidation = (payload: IKittenInterface) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })

    return schema.validate(payload)
}
