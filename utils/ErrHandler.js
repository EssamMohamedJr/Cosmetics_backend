export const ErrorHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => { console.log(err.name, err.stack); return next(new Error(`${err.name}`, { cause: 500 })) })
    }
}

export const globalErr = (err, req, res, next) => {
    if (err) {
        return res.status(err.cause || 500).json({ err: err.message })
    }
    return next()
}