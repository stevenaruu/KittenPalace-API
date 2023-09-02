import Joi from 'joi'

interface KittenInterface {
    name: string
    coin: number
}

export const createKittenValidation = (payload: KittenInterface) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        coin: Joi.number().required()
    })

    return schema.validate(payload)
}
