import jwt from 'jsonwebtoken'
import CONFIG from '../config/environment'

export const signJWT = (payload: object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(payload, `${CONFIG.jwt_private}`, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

export const verifyJWT = (token: string) => {
    try {
        const decoded: any = jwt.verify(token, `${CONFIG.jwt_public}`)
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (err: any) {
        return {
            valid: false,
            expired: err.message === 'jwt is expired or not eligible to use',
            decoded: null
        }
    }
}
