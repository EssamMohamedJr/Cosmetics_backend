import { Router } from "express";
import { userModel } from "../../DB/models/user_model.js";
import { createOptions, sendEmail } from "../../utils/nodemailer.js";
import { generateToken } from "../../utils/generateToken.js";
import { addToCart, addToWishList, dltFromWishList, dltuser, getAllUsers, login, signup,getUserById, updateCart, verify,dltFromCart ,dltCart} from "./controller/controller.js";


const router = Router()
// get all users
router.get('/', getAllUsers)
//signup
router.post('/signup', signup)
//get user by id 
router.get('/by/:id',getUserById)
//login
router.post('/login', login)
//delete user
router.delete('/dlt', dltuser)
//for verify
router.get("/:token", verify)
// add to cart -----> id => user id
router.patch('/addtocart/:id', addToCart)
// update cart -----> id => user id   _id => product id
router.patch('/updatecart/:id/:_id',updateCart)

// add to wish list -----> id => user id   _id => product id
router.patch('/addtowishlist/:id/:_id',addToWishList)
// remove from wish list -----> id => user id   _id => product id
router.patch('/dltfromwishlist/:id/:_id',dltFromWishList)

// remove from cart -----> id => user id   _id => product id
router.patch('/dltfromcart/:id/:_id',dltFromCart)

router.patch('/dltcart/:id',dltCart)

export default router
