import jwt, { verify } from 'jsonwebtoken'

export const generateToken = (obj) => {
    let token = jwt.sign(obj, process.env.MYTOKENSECRET)
    return token
}

export const verifyToken = (token) => {
    let data = jwt.verify(token, process.env.MYTOKENSECRET)
    return data
}