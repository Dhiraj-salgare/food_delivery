import react, { useContext, useEffect, useState, useSyncExternalStore } from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import toast from 'react-hot-toast'
import  delivery from '../../assets/delivery.png'


function Navbar({setShowLogin,name}){

    const {getTotalCartAmount,token,settoken,food_list,setfoodlist,fetchFoodlist}=useContext(StoreContext)
    //defining state for the menu 
    const [menu,setmenu]=useState('home')
    const [serch,setserch]=useState(false)
  
    const navigate=useNavigate()
    const[input,setinput]=useState('')
    console.log(token)

    const logout=()=>{
        localStorage.clear()
        settoken("")
        navigate("/")    //navigating to home page
        toast.success("sucessfully logged out")
        
    }



    useEffect(()=>{
        

        if(input===''){
           fetchFoodlist()
        }
       // console.log(filterfood)
       // setfoodlist(filterfood)
       else{
       let foods=food_list.filter((item)=>item.name.includes(input))
       console.log(foods)
       setfoodlist(foods)
       }
    },[input])



  


  


    function onchangehandler(e){

       setinput(e.target.value)
      
    }

    return(
        <div className='navbar'>
            <h1>Foodie</h1>
           <ul className="navbar-menu">

            <Link to='/' onClick={()=>setmenu('home')} className={menu==='home'?'active':''}>home</Link>
            <a href='#explore-menu' onClick={()=>setmenu('menu')} className={menu==='menu'?'active':""}>menu</a>
            <a href='#app-download' onClick={()=>setmenu('mobile-app')} className={menu==='mobile-app'?'active':""}>mobile-app</a>
            <a href='#footer' onClick={()=>setmenu('contact us')} className={menu ==='contact us'?'active':""}>contact us</a>

           </ul>
           <div className="navbar-right">

           {
                serch?(<div><input type='text' onChange={(e)=>onchangehandler(e)} value={input}></input></div>):<></>
            }
            <img src={assets.search_icon} alt='' onClick={()=>setserch(!serch)}></img>

          
             <div className="navbar-search-icon">
               <NavLink to='/cart'><img src={assets.basket_icon} alt=''></img></NavLink>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
             </div>

             {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>:<div className='navbar-profile'>
                
                <img src={assets.profile_icon} alt="" />
                <ul className='nav-profile-dropdown'>
                    <li><p>welcome {name}</p></li>
                    <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>order</p></li>
                    <hr></hr>
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>logout</p></li>
                </ul>
                </div>}
             
           </div>

        </div>

    )
}

export default Navbar 