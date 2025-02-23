const express=require('express')
const router=express.Router()

//importing middleware for token authentication 
const {auth}=require('../middleware/auth')

//routes
const {addToCart,removeFromCart,getCart}=require('../controllers/cartController')



router.post('/add',auth,addToCart)
router.post('/remove',auth,removeFromCart)
router.post('/get',auth,getCart)



module.exports=router