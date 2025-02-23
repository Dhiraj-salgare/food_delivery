const express=require('express')
const router =express.Router()

//import login and register controller 
const {loginUser,registerUser}=require('../controllers/userController')
const { authuser } = require('../middleware/auth')


//create route for users

router.post('/register',registerUser)
router.post('/login',loginUser)

router.post('/profile',authuser)

module.exports=router
