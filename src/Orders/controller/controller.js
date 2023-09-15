import { orderModel } from "../../../DB/models/order_model.js";
import { ErrorHandler } from "../../../utils/ErrHandler.js";
import { doneResponse } from "../../../utils/done.js";
import { userModel } from "../../../DB/models/user_model.js"
import { ProdModel } from "../../../DB/models/product_model.js";

export const addOrder = ErrorHandler(
    async (req, res, next) => {
        let { id } = req.params
        let { cart, mobileNo, location, userNote } = req.body
        let price = 0
        console.log(cart)
        cart.map(ele => {
            price += (ele.quantity * ele.price)
        })
        console.log(price)

        let done = await orderModel.create({
            user: id,
            cart,
            mobileNo, location, totalPrice: price, userNote

        })
        console.log(done._id)
        if (done) {
            let user = await userModel.findById(id)
            let { orders } = user
            let newOrders = [...orders]
            console.log(newOrders)
            newOrders.push(done._id)
            console.log(newOrders)
            let done2 = await userModel.findByIdAndUpdate(id, { orders: newOrders }, { new: true })
            done2 ? doneResponse(res, done2) : next("Error in adding order to user")
        } else {
            next(new Error("Error in adding order"))
        }
        // let done0=await userModel.findById(id)
        // let {orders}=done0
        // console.log(orders)
        // let newOrder=[...orders]
        // done ? doneResponse(res, done) : next(new Error("Error in adding order"))
    }
)

export const updateOrder = ErrorHandler(
    async (req, res, next) => {
        let { id } = req.params
        console.log(req.body)
        let done = await orderModel.findByIdAndUpdate(id, req.body, { new: true })
        done ? doneResponse(res, done) : next(new Error("error in updating order "))
    }
)
export const getOrders = ErrorHandler(
    async (req, res, next) => {
        let done = await orderModel.find()
        done ? doneResponse(res, done) : next(new Error("error in getting order "))
    }
)

export const getOrderByState = ErrorHandler(
    async (req, res, next) => {
        let { state } = req.query
        let done = await orderModel.find({ state })
        done ? doneResponse(res, done) : next(new Error("error in getting order "))
    }
)

export const deleteOrder = ErrorHandler(
    async (req, res, next) => {
        let { id } = req.params
        let done = await orderModel.findByIdAndDelete(id)
        done ? doneResponse(res, done) : next(new Error("error in deleting order "))
    }
)

export const deleteAllOrdersAlsoForUser = ErrorHandler(
    async (req, res, next) => {
        let { id } = req.params
        let done = await orderModel.findByIdAndDelete(id)
        // console.log(done)
        let user = done.user
        let result = await userModel.findById(user)
        let { orders } = result
        let newOrders = orders.filter((ele) => ele != id)
        console.log(newOrders)
        let done2 = await userModel.findByIdAndUpdate(user, { orders: newOrders }, { new: true })
        done && done2 ? doneResponse(res, { done, done2 }) : next(new Error("error in deleting order "))
    }
)

export const updateall = ErrorHandler(
    async (req, res, next) => {
        // step of updating cart 

        //         orderModel.find({})
        //   .populate("cart.product")
        //   .then((orders) => {
        //     const updatePromises = orders.map(async (order) => {
        //       let totalPrice = 0;
        //       for (const item of order.cart) {
        //         const productId = item.product._id;
        //         const product = await ProdModel.findById(productId);
        //         if (product) {
        //           item.price = product.price;
        //           totalPrice += product.price * item.quantity;
        //         }
        //       }
        //       order.totalPrice = totalPrice;
        //       return order.save();
        //     });

        //     return Promise.all(updatePromises);
        //   })
        //   .then((updatedOrders) => {
        //     console.log(`${updatedOrders.length} orders updated`);
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });

        // step of updating order 
        orderModel.updateMany({}, [
            {
                $set: {
                    totalPrice: {
                        $reduce: {
                            input: "$cart",
                            initialValue: 0,
                            in: {
                                $add: ["$$value", {
                                    $multiply: ["$$this.price", "$$this.quantity"]
                                }]
                            }
                        }
                    }
                }
            }
        ]).then(result => doneResponse(res, result)).catch(err => next(new Error('error')))
    }
)