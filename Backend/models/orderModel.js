//creating database for order product 

const nodemailer=require('nodemailer')
const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"Food processing"
        
    },

    date:{
        type:Date,
        default:Date.now()
    },
    payment:{
        type:Boolean,
        default:false
    },

    mode:{
       type:String,
       required:true
    }
    
})



orderSchema.pre("save", async function (next) {

    console.log(this.status)
    if (this.isModified("status")) {
        try {
            console.log("Status changed, sending email...");
            console.log("adress:",this.items)
            // Create a transporter for sending email
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST, // Make sure MAIL_HOST is set in .env file
                
                auth: {
                    user: process.env.MAIL_USER, // Make sure MAIL_USER is set in .env file
                    pass: process.env.MAIL_PASS, // Make sure MAIL_PASS is set in .env file
                },
            });

            // Prepare the email content
            const subject = `Track your food order!`;
            const statusMessage = `Hello! Your food is currently ${this.status}.`;


            let itemhtml=''


            this.items.forEach(item=>{
                itemhtml+=`<p><strong>${item.name}</strong> - Quantity-${item.quantity} - Price-${item.price}</p>`
            })

            // Send email to the customer
            let info = await transporter.sendMail({
                from: 'Foodie <dhirajsalgare1@gmail.com>', // Replace with your email
                to: this.address.email, // Recipient email from the order document
                subject: subject,
                html: `<h2>Hi ${this.address.fisrtName},</h2>

                       <p>your orders:</p>
                       <p>${itemhtml}</p>
                
                       <p>Your order is currently: <strong>${this.status}</strong></p>

                       <p>Amount: $${this.amount}</p>
                       <p>Thank you for choosing Foodie!</p>`,
                
            });

            console.log("Email sent successfully:", info);

        } catch (err) {
            console.error("Error while sending email:", err);
        }
    }

    // Proceed with the save operation
    next()
   
});











module.exports=mongoose.models.order || mongoose.model("order",orderSchema)