const userModel=require('../models/userModel')


//add item to user cart 

exports.addToCart=async(req,res)=>{

    //find data from database using user id which is in req

    try{
        const userData=await userModel.findOne({_id:req.body.userId})

        let cartData=await userData.cartData

        //if cart data does not contain data with particulat item id then we  will create new entry
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]+=1                //if already available that item id 

        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData})  //update the cart data

        res.json({
            success:true,
            message:"Added to cart"
        })

    }

    catch(err){
        console.log(err)
        res.json({
            success:false,
            message:"errer"
        })
    }





}



//remove item fron user cart 

exports.removeFromCart=async(req,res)=>{


    //we fetch the data from userId which is send by middleware 

    try{

        const userData=await userModel.findById(req.body.userId)
        const cartData=await userData.cartData;

        //checking the item id is present or not 

        if(cartData[req.body.itemId]>0)
        {
             cartData[req.body.itemId]-=1
        }
        //update that cartdat object
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})

         res.json({
            success:true,
            message:"removed from cart"
         })
    }

    catch(error){
        console.log(error)

        res.json({
            success:false,
            message:"errror occured"
        })
    
    
    }



}


//fetch user cart data

exports.getCart=async(req,res)=>{

    try{
        //fetch userdata

        let userData=await userModel.findById(req.body.userId)
        let cartData=await userData.cartData;

        res.json({
            success:true,
            cartData

        })

    }

    catch(err){
        console.log(err)
        res.json({
            success:false,
            message:"error"
        })
    }

}