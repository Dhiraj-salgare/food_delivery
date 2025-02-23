//import express
const express=require('express')
const cors=require('cors')
const dbconnect=require('./config/database')

const foodRouter=require('./routes/foodRoute')

const userRouter=require('./routes/userRouter')
const cartRouter=require('./routes/cartRoute')
const orderRouter=require('./routes/orderRoute')

const app=express()

require('dotenv').config()

const port =process.env.PORT || 5000

//middleware

app.use(express.json())
app.use(cors())     //for connecting backend and frontend 


//connecting to database
dbconnect()

//routes 

app.use('/api/food',foodRouter)
app.use('/api/user',userRouter)

app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

//to acess uploaded pic in frontend 

app.use("/images",express.static("uploads"))


app.get('/',(req,res)=>{
    res.send("Api working")
})


app.listen(port,()=>{
    console.log(`server is started at port${port}`)
})