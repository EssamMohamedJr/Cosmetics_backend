import { newModel } from "../../../DB/models/new_model.js"
import { ErrorHandler } from "../../../utils/ErrHandler.js";
import { doneResponse } from "../../../utils/done.js";

export const getNewArrivals=ErrorHandler(
    async (req, res, next) => {
        let done = await newModel.find()
        done ? doneResponse(res, done) : next(new Error("error in updating order "))
    }
)

export const addNewArrival=ErrorHandler(
    async (req, res, next) => {
        let {id}= req.params
        let done = await newModel.create({prodID:id})
        done ? doneResponse(res, done) : next(new Error("error in updating order "))
    }
)

export const deleteNewArrival=ErrorHandler(
    async (req, res, next) => {
        let {id}= req.params
        let done = await newModel.findOneAndDelete({prodID:id}).catch(err=>{console.log(err)})
        console.log(id)
        done ? doneResponse(res, done) : next(new Error("error in updating order "))
    }
)
