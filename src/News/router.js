import { Router } from "express";
import { addNewArrival, deleteNewArrival, getNewArrivals } from "./controller/controller.js";
const router = Router()
router.get('/all',getNewArrivals)
// id of product
router.post('/add/:id',addNewArrival)
// id of arrival
router.delete('/dlt/:id',deleteNewArrival)
export default router;