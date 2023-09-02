import IUserInterface from '../types/user.type'
import userModel from '../models/user.model'

export const createUser = async (payload: IUserInterface) => {
    return await userModel.create(payload)
}
