import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { data } from 'react-router-dom'

function List({url}){

    //create one list state
    const [list,setlist]=useState([])

  
    //function to retrive data
    const fetchlist=async()=>{

        const response=await axios.get(`${url}/api/food/list`)
        if (response.data.sucess){
            console.log(response)
            setlist(response.data.data)
            toast.success(response.data.message)
        }

        else{
            toast.error("error")
        }
    }


    //remove food

    const removefood=async(foodId)=>{
        const response=await axios.post(`${url}/api/food/remove`,{id:foodId})
        await fetchlist()
        if(response.data.sucess){
            toast.success("item removed")
            
        }
        else{
            toast.error("error")
        }
    }

    useEffect(()=>{
        fetchlist()
    },[])
    return(
        <div className='list add flex-col'>
            <p>All food list</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>


                </div>
                {
                    list.map((item,index)=>{
                        return(
                            <div key={index} className='list-table-format'>
                                <img src={`${url}/images/`+item.image} alt=''></img>
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>${item.price}</p>
                                <p className='cursor' onClick={()=>removefood(item._id)}>X</p>
                            </div>
                        )
                    })
                }
            </div>
           
        </div>
    )
}


export default List