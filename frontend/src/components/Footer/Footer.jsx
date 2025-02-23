import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

function Footer(){
    return( 
        <div className='footer' id='footer'>

            <div className="footer-content">
                <div className="footer-content-left">
                   <h1>Foodie</h1>
                   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, consectetur.</p>
                   
                   <div className="footer-social-icon">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                   </div>

                </div>
                <div className="footer-content-center">

                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li> Delivery</li>
                        <li>Privacy policy</li>
                    </ul>


                </div>
                <div className="footer-content-right">
                   <h2>GET IN TOUCH</h2>

                   <ul>
                    <li>+1-1223-455-667</li>
                    <li>Tomato@gmail.com</li>
                   </ul>

                </div>
            </div>
            <hr></hr>
           <p className="footer-copyright">copyright 2024 Tomato.com -All right reserved</p>


        </div>

    )
}


export default Footer