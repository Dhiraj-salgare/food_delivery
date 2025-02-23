const express=require('express')

const router =express.Router()

//import controller 
const {addFood, listFood, removeFood} =require('../controllers/foodController')

//using multer we create image store system
const multer=require('multer')

//image storage engine
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload=multer({storage:storage})

 //middleware is added
router.post('/add',upload.single("image"),addFood)
router.get('/list',listFood)
router.post('/remove',removeFood)





module.exports=router