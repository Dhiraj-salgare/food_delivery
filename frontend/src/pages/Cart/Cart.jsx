import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

function Cart(){

      const {cartItem,food_list,addToCart,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext)
      const navigate=useNavigate()
    return(
        <div className='cart'>
           
            <div className="cart-items">
                <div className="cart-items-title">
                  
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>remove</p>
                </div>
                <br></br>
                <hr></hr>
 
                {

                    //compare each foo item from foodlist to cart Item
                   food_list.map((item,index)=>{
                        if(cartItem[item._id]>0){
                            return<><div className='cart-items-title cart-items-item'>
                                <img src={`${url}/images/${item.image}`} alt=''></img>
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                                <p>{cartItem[item._id]}</p>
                                <p>${item.price*cartItem[item._id]}</p>
                                <img src={assets.cross_icon} alt='' className='delete' onClick={()=>removeFromCart(item._id)}></img>

                            </div>
                            <hr></hr>
                            </> 

                        }

                   })
                }
            </div>

            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>cart total</h2>
                    <div>
                        <div className="cart-total-detail">
                            <p>subtotal</p>
                            <p>${getTotalCartAmount()}</p>

                        </div>
                        <hr></hr>
                        <div className="cart-total-detail">
                        <p>Delivery Fee</p>
                        <p>${getTotalCartAmount()===0?0:2}</p>
                        </div>
                        <hr></hr>
                        <div className="cart-total-detail">
                        <p>total</p>
                        <p>${getTotalCartAmount()==0?0:getTotalCartAmount()+2}</p>
                        </div>

                      
                    </div>
                    <button onClick={()=>navigate('/order')}>Proceed to Checkout</button>
                </div>

                <div className="cart-promocode">
                    <div>
                        <p>if you have promo code Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type='text' placeholder='promo code'></input>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;