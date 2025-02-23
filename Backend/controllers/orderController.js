//import ordermodel

const orderModel=require('../models/orderModel')
const nodemailer=require('nodemailer')
//import userModel

const userModel=require('../models/userModel')

const Stripe=require('stripe')
require('dotenv').config()

const stripe=new Stripe(process.env.STRIPE_KEY)


//placing user order from frontend

exports.placeOrder=async(req,res)=>{

    const frontend_url="http://localhost:3000"
     console.log("mode",req.body.mode)
    try{
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            mode:req.body.mode
            
        })

        await newOrder.save();

        

        //clear the user cart  after order placed
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})


        //crete stripe payment link
        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        console.log("line items",line_items)
       
        //its is for delivery charge
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery charges"
                },
                unit_amount:2*100*80               //delivery charges are 2 and convertd into INR
            },
            quantity:1
        })

       if(req.body.mode==='online'){
        //craeating a session 
        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,

        })


        res.json({
            success:true,
            session_url:session.url
        })
    }

    else{
        const norder=await orderModel.findOne({_id:newOrder._id})
        await sendEmail(norder)
        
       
        res.json({
            success:true,
            message:"item ordered"
        })
    }

    }

    catch(err){
        console.log(err)

        res.json({
            success:false,
            message:"error"
        })
    }

    
}


exports.verifyOrder=async(req,res)=>{
    const{orderId,success} =req.body
    try{
        if(success=='true')
        {
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"paid"})

            const norder=await orderModel.findOne({_id:orderId})
            await sendEmail(norder)
            
        }

        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({
                success:false,
                message:"not paid"
            })
        }

    }
    catch(err){

        console.log(err)
        res.json({success:false,message:"error"})
    }

}


//userorders for frontend

exports.userOrders=async(req,res)=>{
    //using userId we can fetch the orders of particular user 

    try{
        const orders=await orderModel.find({userId:req.body.userId})
        res.json({
            success:true,
            data:orders
        })
    }

    catch(err){
        console.log(err)
        res.json({success:false,
            message:"error"
        })
    }

}



//listing orders for admin panel


exports.listOrder=async(req,res)=>{

    try{
        const orders=await orderModel.find({})
        res.json({
            success:true,
            data:orders
        })
    }

    catch(err){
        res.json({
            success:false,
            message:"error"
        })
    }
     
}

//api for updating order status

exports.updateStatus=async(req,res)=>{
    try{
        //await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})

       const order=await orderModel.findById(req.body.orderId);

       if(!order){
          return res.json({
            status:false,
            message:"order is not found"
          })
       }


       order.status=req.body.status

       await order.save();


        

        res.json({
            success:true,
            message:"status updated"
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




const sendEmail = async (order) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // Make sure MAIL_HOST is set in .env file
            auth: {
                user: process.env.MAIL_USER, // Make sure MAIL_USER is set in .env file
                pass: process.env.MAIL_PASS, // Make sure MAIL_PASS is set in .env file
            },
        });

        const subject = `Track your food order!`;
           let itemhtml=''
           order.items.forEach(item=>{
            itemhtml+=`<p><strong>${item.name}</strong> - Quantity-${item.quantity} - Price-${item.price}</p>`
        })

        // Send the email
        const info = await transporter.sendMail({
            from: 'Foodie <dhirajsalgare1@gmail.com>', // Replace with your email
            to: order.address.email, // Recipient email from the order document
            subject: subject,
            html: `<h2>Hi ${order.address.fisrtName},</h2>
                   <p>your Orders</p>
                   <p>${itemhtml}</p>
                   <p>Your order has been placed and is currently: <strong>${order.status}</strong></p>
                   <p>Amount: ₹${order.amount}</p>
                   <p>Thank you for choosing Foodie!</p>`,
        });

        console.log('Email sent successfully:', info);
    } catch (err) {
        console.error('Error sending email:', err);
    }
};