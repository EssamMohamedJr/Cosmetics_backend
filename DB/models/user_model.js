import { Schema, model } from "mongoose";
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    gmail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String },
    mobileNo: { type: String },
    verified: { type: Boolean, default: false },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    wishList: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    cart: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }],
    rate: [{
        product: { type: Schema.Types.ObjectId, ref: "Product"},
        rate: { type: Number, default: 0 }
    }],
})

export const userModel = model('User', userSchema)
