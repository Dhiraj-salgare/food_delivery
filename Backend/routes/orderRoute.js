//import ordercontroller function
const express=require('express')
const router=express.Router()
const {placeOrder, verifyOrder, userOrders,listOrder, updateStatus}=require('../controllers/orderController')
//importing middleware 

const {auth}=require('../middleware/auth')




router.post("/place",auth,placeOrder)
router.post("/verify",verifyOrder)
router.post('/userorders',auth,userOrders)
router.get('/list',listOrder)
router.post("/status",updateStatus)

//exporting the orderRouter


module.exports=router