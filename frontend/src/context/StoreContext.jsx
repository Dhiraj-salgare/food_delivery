import { createContext, useEffect } from "react";

import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
export const StoreContext =createContext(null)



export default function StoreContextProvider(props){

    const[cartItem,setcartItem] =useState({})
    const[food_list,setfoodlist]=useState([])


    const navigate=useNavigate();

    //token and set token 
    const [token,settoken]=useState("")

    const url="http://localhost:4000"
    
    console.log("context token",token)
    const  addToCart=async(itemId)=>{
        if(!cartItem[itemId]){
            setcartItem(prev=>({...prev,[itemId]:1}))
        }

        else{
            setcartItem(prev=>({...prev,[itemId]:prev[itemId]+1}))
        }
        

        //if token also add in database
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }

    }


    const removeFromCart=async(itemId)=>{
        setcartItem(prev=>({...prev,[itemId]:prev[itemId]-1}))
       if(token){
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
       }
    }



    useEffect(()=>{
       console.log(cartItem) 
    },[cartItem])


  
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItem){
            //finding the product in food list
            if(cartItem[item]>0){
            let  itemInfo=food_list.find((product)=>product._id===item)
            totalAmount+=itemInfo.price*cartItem[item]
            }

        }
        return totalAmount


    }


    //load cart data from database
      const loadCartData=async(token)=>{
        const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
        //set cart item

        if(!response.data.success){
            navigate('/')
            localStorage.clear()
            settoken('')
        }
        else{
        setcartItem(response.data.cartData);
        }
      }


    //fetching food list 

    const fetchFoodlist=async()=>{
        const response=await axios.get(url+"/api/food/list");
     
      
            setfoodlist(response.data.data)
        


    }

    useEffect(()=>{

        async function load(){
            await fetchFoodlist()
            if(localStorage.getItem("token"))
                {
                  settoken(localStorage.getItem("token"))
                  await loadCartData(localStorage.getItem("token"))
                }
        }
        load()
  
    },[])


  

    

    
    const contextValue={
                   
        food_list,
        cartItem,
        setcartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        fetchFoodlist,
        token,
        settoken,
        setfoodlist
       


    }


    return (
        <StoreContext.Provider value={contextValue}>
            {
                props.children
            }
        </StoreContext.Provider>

    )

}