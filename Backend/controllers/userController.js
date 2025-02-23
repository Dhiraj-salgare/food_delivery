const userModel=require('../models/userModel')
//import jwt 
const jwt=require('jsonwebtoken')

//import bcrypt 
const bcrypt=require('bcrypt')

//import validator
const validator =require('validator')

require('dotenv').config()
//login user function

exports.loginUser=async(req,res)=>{

    //login logic

    const {email,password}=req.body

    try{
        //cheacking availability of email
        const user=await userModel.findOne({email})

        if(!user){
            return res.json({
                success:false,
                message:"register first then login"
            })
        }

        //compare password
        const match=await bcrypt.compare(password,user.password)

        if(!match){
            return res.json({
                success:false,
                message:"please enter correct password",
                
            })
        }

        const token=createToken(user._id,user.name)
        res.json({
            success:true,
            message:"sucessfully logged in",
            token
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

//creating token
const createToken=(id,name)=>{
      return jwt.sign({id,name},process.env.JWT_SECRET,{expiresIn:'2h'})
}


//register user 

exports.registerUser=async(req,res)=>{

    //logic to register user 
    const {name,password,email}=req.body

    try{
        //checking the user is exist or not 
        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({
                success:false,
                message:"email id is already registered"

            })
        }

        //validating email format and strong password 

        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"please enter the valid email"
            })
        }
        
        if(password.length<8){
            return res.json({
                success:false,
                message:"please enter strong password"
            })
        }

        //hashing user password and store into the database
        const salt=await bcrypt.genSalt(10)   //we can add number 5 to 15 
        const hashedPassword=await bcrypt.hash(password,salt)   //now password is hashed 

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

       const user=await newUser.save()
       //token function caling
       const token=createToken(user._id,user.name)

       res.json({
          success:true,
          token
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

