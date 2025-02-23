import React, { useContext, useEffect } from 'react'

import './Login.css'
import {useState} from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import toast from 'react-hot-toast'

function Login({setShowLogin}){
    const {url,token,settoken}=useContext(StoreContext)
    const [currState,setcurrState]=useState("Login")

    const [data,setdata]=useState({name:"",
        email:"",
        password:""})
    
    const onchangehandler=(event)=>{
        setdata({
            ...data,
            [event.target.name]:event.target.value
        })

    }

    //login function

    const onLogin=async(event)=>{
        event.preventDefault();

        let newurl=url
        if(currState==="Login"){
            newurl+="/api/user/login"
        }
        else{
            newurl+="/api/user/register"
        }

        const response=await axios.post(newurl,data)
        console.log(response)
        if(response.data.success){
           settoken(response.data.token)
           //saving these token in local storage

           if(currState==="Login"){
            toast.success("logged in successfully")
            localStorage.setItem("token",response.data.token)
           }
           else{
            toast.success("Registered successfully")
           }

        
           setShowLogin(false)   //loggin page will hidden
        }

        else{
            alert(response.data.message)
        }



    }



    useEffect(()=>{
        console.log(data)
    },[data])
    return(
        <div className='login'>
             <form  onSubmit={onLogin} className="login-container">
                <div className="login-title">
                    <h2>{currState}</h2>
                    <img  onClick={()=>{setShowLogin(false)}}src={assets.cross_icon}></img>
                </div>

                <div className="login-inputs">

                    {currState==="Login"?<></>:<input  name='name' onChange={onchangehandler} type='text' placeholder='Your name' required value={data.name}></input>}
                    
                    <input type='email' name='email' placeholder='Your Email' required onChange={onchangehandler} value={data.email}></input>
                    <input type='password' name='password' placeholder='Your password' required onChange={onchangehandler} value={data.password}></input>
                </div>

                <button type='submit'>{currState==='Sign Up'?"Create Account":"Login"}</button>

                <div className="login-condition">
                    <input type='checkbox' required></input>
                    <p>By continueing i agree to the terms and conditions</p>
                </div>
                {currState==="Sign Up"? <p>already have an account?<span onClick={()=>setcurrState("Login")}>Login  here</span></p>:<p>create a new account?<span onClick={()=>setcurrState("Sign Up")}>Click here</span></p>}
  
                
             </form>
        </div>
    )
}

export default Login