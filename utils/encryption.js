import bcrypt from 'bcryptjs'

export const encrypt = (value) => {
    let hashedValue = bcrypt.hashSync(value, parseInt(process.env.Rounds))
    return hashedValue
}

export const compare = (enterdValue, hashedValue) => {
    let isSame = bcrypt.compareSync(enterdValue, hashedValue)
    return isSame
}
