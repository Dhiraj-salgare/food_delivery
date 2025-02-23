import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

function Verify(){

    const [searchParam,setSearchParam]=useSearchParams()
    //get the search parametre from url
    const success=searchParam.get("success")
    const orderId=searchParam.get("orderId")
    console.log(success,orderId)

    const{url}=useContext(StoreContext)

    const navigate=useNavigate()


    const verifyPayment=async()=>{
        const resp=await axios.post(url+"/api/order/verify",{success,orderId})
        if(resp.data.success){
            navigate("/myorders")
        }

        //if payment is failed 

        else{
            navigate("/")

        }
    }


    useEffect(()=>{
            verifyPayment()
    },[])
    return (
        <div className='verify'>
            <div className="spinner">

            </div>
       hii

        </div>
    )
}

export default Verify 