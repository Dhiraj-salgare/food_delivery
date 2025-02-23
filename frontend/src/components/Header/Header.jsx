import React from "react";
import './Header.css'

import menu1 from '../../assets/menu_1.png'
import { assets } from "../../assets/assets";
import img1 from '../../assets/photo.png'

function Header(){
    return(
        <div className="header">
           <img src={img1} alt=""></img>
           
           <div className="header-content">
            <h2>Order your favourite food here</h2>
            <p>choose from a diverse menu featuring a delectable array of dishesh</p>
            <button>view Menu</button>
           </div>

        </div>
    )
}

export default Header