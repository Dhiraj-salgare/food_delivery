import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Header from '../../components/Header/Header'
import { useEffect, useState } from 'react'
import './Home.css'
import React from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/Appdownload/AppDownload'
import { assets } from '../../assets/assets'
import  delivery from '../../assets/delivery.png'
function Home(){

    const[category,setcategory]=useState("All")

    const [load,setload]=useState(true)


    useEffect(()=>{
        setTimeout(() => {
            setload(false)
        }, 5000);
    })
    return(
        <div className='cont'>
           {load && <div className='sub'>

             

<div className="boy">

<div className='parcel'><img src={assets.parcel_icon}></img></div>
<img src={delivery} alt=''width="250px"></img>

</div>
<div className='road'></div>


</div>}
            

            <Header></Header>
            <ExploreMenu category={category} setcategory={setcategory}></ExploreMenu>
             <FoodDisplay category={category}></FoodDisplay>
             <AppDownload></AppDownload>
        </div>
    )
}

export default Home