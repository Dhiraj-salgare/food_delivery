import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

function Sidebar(){
    return(
        <div className='sidebar'>
            <div className="sidebar-options">
                <NavLink to='/Add' className="sidebar-option">
                    <img src={assets.add_icon} alt=''></img>
                    <p>Add Items</p>
                </NavLink>
                <NavLink  to='/list' className="sidebar-option">
                    <img src={assets.order_icon} alt=''></img>
                    <p>List Items</p>
                </NavLink>
                <NavLink to='/orders' className="sidebar-option">
                    <img src={assets.order_icon} alt=''></img>
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar