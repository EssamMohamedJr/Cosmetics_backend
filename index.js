import express from 'express'
import dotenv from 'dotenv'
import connect from './DB/connection.js'
import ProductRouter from './src/Products/router.js'
import userRouter from './src/Users/router.js'
import orderRouter from './src/Orders/router.js'
import newRouter from './src/News/router.js'
import { globalErr } from './utils/ErrHandler.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors({
    origin: '*'
}));
app.use(express.json({}))
app.use('/order', orderRouter)
app.use('/product', ProductRouter)
app.use('/user', userRouter)
app.use('/new', newRouter)
app.use(globalErr)
connect()
app.listen(process.env.PORT, () => {
    console.log('listin')
})


