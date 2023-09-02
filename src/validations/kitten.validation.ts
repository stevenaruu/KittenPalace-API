import Joi from 'joi'
import IKittenInterface from '../types/kitten.type'

export const createKittenValidation = (payload: IKittenInterface) => {
    const schema = Joi.object({
        kitten_id: Joi.string().required(),
        name: Joi.string().required(),
        coin: Joi.number().required(),
        ancestry: Joi.string().required(),
        origin: Joi.string().required(),
        color: Joi.string().required(),
        description: Joi.string().allow('', null)
    })

    return schema.validate(payload)
}

export const updateKittenValidation = (payload: IKittenInterface) => {
    const schema = Joi.object({
        name: Joi.string().allow('', null),
        coin: Joi.number().allow('', null),
        ancestry: Joi.string().allow('', null),
        origin: Joi.string().allow('', null),
        color: Joi.string().allow('', null),
        description: Joi.string().allow('', null)
    })

    return schema.validate(payload)
}
