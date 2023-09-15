import { Schema, model } from "mongoose";
const newSchema = new Schema({
    prodID:{type: Schema.Types.ObjectId, ref: 'Product',unique:true}
})

export const newModel = model('New', newSchema)
