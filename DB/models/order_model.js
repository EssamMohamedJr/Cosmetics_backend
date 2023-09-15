import { Schema, model } from "mongoose";
const orderSchema = new Schema({
    totalPrice: { type: Number },
    // shippingPrice: { type: Number, default: 50 },
    // price: { type: Number },
    state: { type: String, enum: ['pending', 'accepted','ready to ship' ,'shipping', 'canceled', 'delivered','done'], default: "pending" },
    location: { type: String, required: true },
    mobileNo: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cart: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        price: { type: Number }
    }],
    userNote:{type:String ,default:"No Notes"},
    AdminNote:{type:String ,default:"No Notes"}
},{timestamps:true})
// orderSchema.virtual('totalPrice').get(function () {
//     let price = 0
//     this.products.forEach(element => {
//         price=element.totalPrice
//     });
//     return price + this.shippingPrice
// })

export const orderModel = model('Order', orderSchema)
