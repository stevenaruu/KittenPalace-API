import { logger } from '../utils/logger'
import kittenModel from '../models/kitten.model'
import IKittenInterface from '../types/kitten.type'

export const addKittenToDB = async (payload: IKittenInterface) => {
    return await kittenModel.create(payload)
}

export const getKittenFromDB = async () => {
    return await kittenModel
        .find()
        .then((data) => {
            return data
        })
        .catch((err) => {
            logger.info('Cannot get data from database')
            logger.error(err)
        })
}

export const getKittenById = async (id: string) => {
    return await kittenModel.findOne({ kitten_id: id })
}

export const updateKittenById = async (id: string, payload: IKittenInterface) => {
    return await kittenModel.findOneAndUpdate({ kitten_id: id }, { $set: payload })
}
