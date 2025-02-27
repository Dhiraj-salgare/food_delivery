
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import './FoodItem.css'
import React, { useContext} from 'react'
function FoodItem({id,name,image,price,description}){


    const {cartItem,addToCart,removeFromCart,url}=useContext(StoreContext)
    return(
        <div className='food-item'>
            <div className="food-item-img-container">
                <img src={`${url}/images/${image}`} alt='' className='food-item-img'></img>
                {
                    !cartItem[id]?<img src={assets.add_icon_white} className='add' alt='' onClick={()=>addToCart(id)}></img>:<div className='food-item-counter'>
                        <img src={assets.remove_icon_red} alt='' onClick={()=>removeFromCart(id)}></img>
                        <p>{cartItem[id]}</p>
                        <img src={assets.add_icon_green} alt='' onClick={()=>addToCart(id)}></img>
                        </div>
                }
                
            
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt=''></img>
                </div>
                <p className="food-item-desc">
                    {description}
                </p>
                <p className='food-item-price'>${price}</p>
            </div>


        </div>
    )
}
export default FoodItem