import { logger } from '../utils/logger'
import kittenModel from '../models/kitten.model'

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
