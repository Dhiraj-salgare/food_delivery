import React, { useState } from 'react'
import './Add.css'
import { assets, url } from '../../assets/assets';
import axios from 'axios'
import toast from 'react-hot-toast';


function Add({url}){

    const [image,setimage]=useState(false)
    console.log(image)

    

    const [data,setdata]=useState({name:"",description:"",price:"",category:"Salad"})    //added default category salad

    const onchangehandler=(event)=>{
        setdata({
            ...data,
            [event.target.name]:event.target.value
        }
        )

    }
    console.log(data)


    //onsubmit function
    const onsubmithandler=async(event)=>{
        event.preventDefault()
        const formdata=new FormData()
        formdata.append("name",data.name)
        formdata.append("description",data.description)
        formdata.append("price",Number(data.price))
        formdata.append("category",data.category)
        formdata.append('image',image)
        console.log(formdata)

        const response=await axios.post(`${url}/api/food/add`,formdata)
        if(response.data.sucess){
            setdata({
                name:"",
                description:"",
                price:"",
                category:"Salad",

            })

            setimage(false)

            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }

    
    }
    return (
        <div className='add'>

            <form className='flex-col' onSubmit={onsubmithandler}>
                <div className="add-image flex-col">
                    <p>upload image</p>
                    <label htmlFor='image'>
                        <img src={image?URL.createObjectURL(image):assets.upload_area}></img>
                    </label>
                    <input type='file' id='image' hidden required onChange={(e)=>setimage(e.target.files[0])}></input>

                </div>

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input type='text' name='name' placeholder='enter product name' onChange={onchangehandler} value={data.name}></input>
                </div>

                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea type='text' name='description' placeholder='enter product description' onChange={onchangehandler} value={data.description}></textarea>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                       <p>Product Category</p>
                       <select name='category' onChange={onchangehandler} value={data.category}>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Cake">Cake</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                       </select>
                    </div>

                    <div className="add-price flex-col">
                         <p>Product Price</p>
                         <input type='Number' name='price' placeholder='$20' onChange={onchangehandler} value={data.price}></input>

                    </div>
                </div>


                <button type='submit' className='add-btn'>Add</button>

            </form>
             
        </div>
    )
}

export default Add;