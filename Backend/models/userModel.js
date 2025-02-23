
//import mongoose

const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        default:{}
    }

},{minimize:false})   //minimize = cart data will created without any initial data
                       //if we do not add minimize false cart data is not added

module.exports=mongoose.model.user|| mongoose.model("user",userSchema)