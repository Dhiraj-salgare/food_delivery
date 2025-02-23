const mongoose=require('mongoose')


//connecting database

function connectdb(){  
     mongoose.connect('mongodb+srv://dhirajsalgare7057:6MTowtoQoQYCrJgl@dummyproject.wqwzi.mongodb.net/?retryWrites=true&w=majority&appName=dummyproject',{
        useNewUrlParser:true,
        useUnifiedTopology:true
        
    }).then(()=>{
        console.log("database connected sucessfully")
    }).catch((errr)=>{
        console.log(errr)
        console.log('error ocurred during database connection')
    })
}

module.exports=connectdb