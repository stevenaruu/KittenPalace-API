import Joi from 'joi'
import KittenInterface from '../types/kitten.type'

export const createKittenValidation = (payload: KittenInterface) => {
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
