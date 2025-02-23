const mongoose=require('mongoose')

const foodSchema=new mongoose.Schema({
         
    name:{
        type:String,
        required:true
    },
    description:{
       type:String,
       required:true
    },

    price:{
        type:Number,
        required:true
    },

    image:{
        type:String,
        required:true
    },
    category:{type:String,
        required:true}
 
})

//if food model is not there it will create new model
module.exports=mongoose.model.food || mongoose.model("food",foodSchema)