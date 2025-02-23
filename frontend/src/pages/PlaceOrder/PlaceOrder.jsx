import { StoreContext } from '../../context/StoreContext'
import './PlaceOrder.css'
import React, { useContext, useEffect, useState, useSyncExternalStore } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


function PlaceOrder(){

    const {getTotalCartAmount,token,food_list,cartItem,url}=useContext(StoreContext)
     const navigate=useNavigate()
      //storing form data
      const [data,setData]=useState({fisrtName:"",lastName:"",email:"",street:"",city:"",state:"",zipcode:"",country:"",phone:""})

      const [modes,setmode]=useState('')

      console.log(data)
    const onChangehandler=(event)=>{
        setData(
            {
                ...data,
                [event.target.name]:event.target.value
            }
        )

    }


    function paymode(ea){
        setmode(ea)
    }

    const placeOrder=async(event)=>{
        event.preventDefault()
        let orderItems=[]
        const name=event.target
        console.log(name)
        food_list.map((item)=>{
            if(cartItem[item._id]>0){
                let itemInfo=item
                itemInfo["quantity"]=cartItem[item._id]
                console.log(item)
                orderItems.push(itemInfo)

            }
          
        })
        console.log(orderItems)

        let orderData={
            address:data,
            items:orderItems,
            amount:getTotalCartAmount()+2,
            mode:modes
        }

        //fetch api
        if(modes==='online'){
        let response= await axios.post(url+"/api/order/place",orderData,{headers:{token}})

        if(response.data.success){
            const {session_url}=response.data
            window.location.replace(session_url)
        }

        else{
            alert("error")
        }
      }

      else{
        let response= await axios.post(url+"/api/order/place",orderData,{headers:{token}})
        console.log(response)

        if(response.data.success)
         {
            toast.success("order placed successfully")
            navigate(
                '/myorders'
            )
         }        

      }
    }

    useEffect(()=>{
        if(!token){
            navigate('/cart')
            
        }
        else if(getTotalCartAmount()===0){
            navigate("/cart")
        }

    },[token])


   


  
    return(
        <form className='place-order' onSubmit={placeOrder}>
         <div className="place-order-left">
            <p className='title'>Delivery Information</p>
            <div className="multi-fields">
                <input type="text"  name="fisrtName" placeholder='First Name' onChange={onChangehandler} value={data.fisrtName} required/>
                <input type="text"  name="lastName" placeholder='last Name' onChange={onChangehandler} value={data.lastName} required/>
            </div>

            <input type='email' placeholder='Email Adress' name="email" onChange={onChangehandler} value={data.email} required></input>
            <input type='text' placeholder='street' name='street' onChange={onChangehandler} value={data.street} required></input>

            <div className="multi-fields">
                <input type="text" placeholder='City' name='city' onChange={onChangehandler} value={data.city} required/>
                <input type="text"  placeholder='State' name='state' onChange={onChangehandler} value={data.state} required/>
            </div>

            <div className="multi-fields">
                <input type="text" placeholder='Zip code' name='zipcode'onChange={onChangehandler} value={data.zipcode} required/>
                <input type="text"  placeholder='Country' name='country'onChange={onChangehandler} value={data.country} required/>
            </div>
            <input type="text" placeholder='Phone' name='phone'onChange={onChangehandler} value={data.phone} required/>

         </div>
         <div className="place-order-right">
         <div className="cart-total">
                    <h2>cart total</h2>
                    <div>
                    <div className="cart-total-detail">
                            <p>subtotal</p>
                            <p>${getTotalCartAmount()}</p>

                        </div>
                        <hr></hr>
                        <div className="cart-total-detail">
                        <p>Delivery Fee</p>
                        <p>${getTotalCartAmount()===0?0:2}</p>
                        </div>
                        <hr></hr>
                        <div className="cart-total-detail">
                        <p>total</p>
                        <p>${getTotalCartAmount()==0?0:getTotalCartAmount()+2}</p>
                        </div>


                      
                    </div>
                    <button type='submit'  onClick={()=>paymode('online')}>online payment</button>
                    <button type='submit'  onClick={()=>paymode('cash')}>cash on delivery</button>
                </div>
         </div>

        </form>
    )
}

export default PlaceOrder