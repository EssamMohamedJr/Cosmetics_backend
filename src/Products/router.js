import { Router } from "express";
import { fileUpload } from "../../utils/cloudMulter.js";

import { addImageForProduct, addProduct, deleteImageOfProduct, dltProduct, getAllProducts, getProductById, searchByName, updateProduct , addRate} from "./controller/controller.js";
import { ProdModel } from "../../DB/models/product_model.js";
import { doneResponse } from "../../utils/done.js";
const router = Router()

//get all products with filter if needed
router.get('/all',getAllProducts)

//get product by id 
router.get('/by/:id',getProductById)

//add product
router.post('/add',fileUpload(['image/png','image/jpeg','image/jpg']).array('images'),addProduct)

//delete product
router.delete('/dlt/:id',dltProduct)

//delete all data
router.delete("/dt",async(req,res,next)=>{
let d= await ProdModel.deleteMany()
console.log(d)
d?doneResponse(res,d):next(new Error("error"))
})
// update all product info except images
router.put('/update/:id',updateProduct)
// add rate 
router.put('/rate/:uid/:pid', addRate)

// //search in data
// router.get('/search',searchByName)

//delete image in exist product
router.patch('/dltimg/:id',deleteImageOfProduct)

//add image for exist product
router.patch('/addimg/:id',fileUpload(['image/png','image/jpeg','image/jpg']).array('images'),addImageForProduct)

export default router