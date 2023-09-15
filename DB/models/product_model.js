import { Schema, model } from "mongoose";
const productSchema = new Schema({
    price: { type: Number },
    newPrice: { type: Number },
    brand: { type: String, default: "" },
    isAvailable: { type: Boolean, default: true },
    prodName: { type: String, required: true },
    prodDescription: { type: String },
    sale: { type: Number, default: 0 },
    category: { type: String },
    images: [{ type: Object }],
    quantity: { type: Number, default: 1 },
    rate: [{
        user: { type: Schema.Types.ObjectId, ref: "User" },
        rate: { type: Number, default: 0 }
    }],
    rating: { type: Number, default: 0 },
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: "User" },
        comment: { type: String } }
    ]
}, { timestamps: true })
export const ProdModel = model('Product', productSchema)
