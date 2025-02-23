const foodModel=require('../models/foodModel')

//importing the file system prebuild in nodejs

const fs=require('fs')


//add food Item


//using these controller we acan add new item in website
exports.addFood=async(req,res)=>{

    let image_filename=`${req.file.filename}`
    console.log(req.file)
    console.log("before:",image_filename)
    console.log("after:",req.file.filename)

    //create entry
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    //saving into database
    try{
        await food.save()
        res.json({
            sucess:true,
            message:"food is added"
        })

    }
    catch(eror){
        console.log(eror)
        res.json({
            sucess:false,
            message:"error while saving  data in database"
        })

    }

}


//get food list

exports.listFood=async(req,res)=>{

    try{
        const foods=await foodModel.find({})
        res.json({
            sucess:true,
            data:foods,
            message:"items are fetched"
        })
    }

    catch (error){
        console.log(error)
        res.json({
            sucess:false,
            message:error
        })
    }

}

//remove food item
exports.removeFood=async(req,res)=>{

    try{
        const food=await foodModel.findById(req.body.id)
        //delete the image uploaded in uploads
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id)

        res.json({
            sucess:true,
            message:"food removed"
        })
    }

    catch(err){
        console.log(err)
        res.json({
            sucess:false,
            message:"will not able to delete"
        })
    }

}