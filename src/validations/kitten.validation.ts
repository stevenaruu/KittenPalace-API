import Joi from 'joi'
import IKittenInterface from '../types/kitten.type'

export const createKittenValidation = (payload: IKittenInterface) => {
    const schema = Joi.object({
        kitten_id: Joi.string().required(),
        id: Joi.number().required(),
        title: Joi.string().required(),
        name: Joi.string().required(),
        coin: Joi.number().required(),
        star: Joi.number().required(),
        image: Joi.string().required(),
        description: Joi.string().allow('', null)
    })

    return schema.validate(payload)
}

export const updateKittenValidation = (payload: IKittenInterface) => {
    const schema = Joi.object({
        title: Joi.string().allow('', null),
        name: Joi.string().allow('', null),
        coin: Joi.number().allow('', null),
        star: Joi.number().allow('', null),
        image: Joi.string().allow('', null),
        description: Joi.string().allow('', null)
    })

    return schema.validate(payload)
}
