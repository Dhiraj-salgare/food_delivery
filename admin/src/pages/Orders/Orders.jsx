import React, { useEffect, useState } from 'react'

import axios from 'axios'
import './Orders.css'

import '../../assets/assets'
import { assets } from '../../assets/assets'

function Orders({url}){


    const [orders,setorder]=useState([])

     console.log("orders",orders)
    const fetchorder=async()=>{
        const response =await axios.get(url+"/api/order/list");


        if(response.data.success){
            setorder(response.data.data)
            console.log(response.data)
          
            
        }
        else{

            console.log("error occured")

        }
    }


    const statushandler=async(event,orderId)=>{

        const response=await axios.post(url+"/api/order/status",{orderId,status:event.target.value})

        if(response.data.success){
            await fetchorder()
        }

    }

    useEffect(()=>{
        fetchorder()
    },[])

    return (
        <div className='order add'>
             <h1>orders  Page</h1>

            <div className="order-list">
                {
                    orders.map((order,index)=>(
                        <div key={index} className='order-item'>

                            <img src={assets.parcel_icon} alt=''></img>
                            
                                <div className='order-item-food'>
                                    {
                                        order.items.map((item,index)=>{


                                            if(index==order.items.length-1){
                                                return item.name +" X "+ item.quantity
                                            }
                                            else{
                                                return item.name +" X " +item.quantity+","
                                            }

                                        })
                                    }
                                </div>
                                <p className='order-item-name'>{order.address.fisrtName+" "+order.address.lastName}</p>
                                <div className="order-item-address">
                                    <p>{order.address.street+","}</p>
                                    <p>{order.address.city+","+order.address.state+","+order.address.country+","+order.address.zipcode}</p>
                                    <p>Mob:{order.address.phone}</p>
                                </div>
                                
                                <p>Items:{order.items.length}</p>
                                <p>${order.amount}</p>

                                <select onChange={(event)=>statushandler(event,order._id)} value={order.status}>
                                    <option value="Food Processing">Food Processing</option>
                                    <option value="Out for delivery">out for delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                        
                        </div>

                    ))
                }
            </div>
        </div>
    )
}

export default Orders