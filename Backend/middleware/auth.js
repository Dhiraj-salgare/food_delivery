const jwt =require("jsonwebtoken")


exports.auth=async(req,res,next)=>{

    const {token}=req.headers
    if (!token){
        return res.json({success:false,message:"Not authorized login again "})
    }

    //if token is available
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId=token_decode.id
        next()
    }
    catch(error){
        console.log(error)

        res.json({
            success:false,
            message:"error"
        })
    }

}



exports.authuser=async(req,res)=>{

    const {take}=req.headers
    if (!take){
        return res.json({success:false,message:"Not authorized login again "})
    }

    //if token is available
    try{
        const token_decode=jwt.verify(take,process.env.JWT_SECRET)
        req.body.userId=token_decode.id

        res.json({
            success:true,
            data:token_decode,
        })
      
    }
    catch(error){
        console.log(error)

        res.json({
            success:false,
            message:"error"
        })
    }

}