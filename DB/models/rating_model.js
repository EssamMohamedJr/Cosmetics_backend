import { Schema, model } from "mongoose";
const ratingSchema = new Schema({
    user: { type: Schema.Types.ObjectId ,ref:"User"},
    product:{type: Schema.Types.ObjectId ,ref:"Product"}
}, { timestamps: true })
export const ProdModel = model('Rating', ratingSchema)
