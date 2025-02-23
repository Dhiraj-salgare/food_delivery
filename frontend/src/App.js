
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import Login from './components/Login/Login';
import Verify from './pages/Verify/Verify';
import Myorders from './pages/Myorders/Myorders';
import axios from 'axios';
import { useEffect } from 'react';

function App() {

  const [showLogin,setShowLogin]=useState(false)
  const [name,setname]=useState('')

  useEffect(()=>{
    async function auths(){

     if(localStorage.getItem('token')){
         const take=localStorage.getItem('token')
     const resp= await axios.post("https://food-delivery-backend1-riv6.onrender.com/api/user/profile",{},{headers:{take}})

     console.log(resp)

     setname(resp.data.data.name)
    }}

    auths()
 },[localStorage.getItem('token')])
  return (
    <>

    {
      showLogin?<Login setShowLogin={setShowLogin}></Login>:<></>
    }


    <div className="App">
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin} name={name}></Navbar>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/order' element={<PlaceOrder></PlaceOrder>}></Route>
        <Route path='/verify' element={<Verify></Verify>}></Route>
        <Route path='/myorders' element={<Myorders></Myorders>}></Route>
      </Routes>

     
      
    </div>
     <Footer></Footer>
     </>
  );
}

export default App;
