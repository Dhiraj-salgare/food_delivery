
import { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

function Myorders(){

    const [data,setdata]=useState([])
    const {url,token,settoken}=useContext(StoreContext)

    const navigate=useNavigate()


    const fetchOrders=async()=>{
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}})
    

        if(!response.data.success){
             navigate('/')
             localStorage.clear()
             settoken('')
        }

        else{
            setdata(response.data.data)
            console.log(response.data.data)
        }

       
        
    }


    useEffect(()=>{

        if(token){
            fetchOrders()
        }
           
    },[token])

    return(

        
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">

                {
                    data.map((order,index)=>{
                        return (<div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt=''></img>

                            <p>{order.items.map((item,index)=>{
                                 if(index=== order.items.length-1){
                                    return item.name+" X "+ item.quantity
                                 }

                                 else{
                                    return item.name +" X "+item.quantity+","
                                 }
                            })}</p>
                            <p>${order.amount}.00</p>

                            <p>Items:{order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>

                            <button onClick={fetchOrders}>track Order</button>


                        </div>)
                    })
                }

            </div>
                 
        </div>
    )
}

export default Myorders