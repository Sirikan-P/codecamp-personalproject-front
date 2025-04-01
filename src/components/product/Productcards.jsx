import React, { useState } from 'react'
import {  useNavigate } from 'react-router'
import numeral from 'numeral';
import useAuthStore from '../../store/auth-store';
import { createAlert, createConfirmAlert } from '../../utils/createAlert';
import useListingStored from '../../store/listing-store';

function Productcards(props) {
const {product ,isSeller ,hdlDelete} = props


//zustand : global state
const user = useAuthStore(state => state.user)
const token = useAuthStore(state => state.token)



let imgSrc = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1858&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
 if (product?.ProductImage[0]) {
    //console.log(products.ProductImage[0].imageUrl)
    imgSrc = product?.ProductImage[0]?.imageUrl
 }

  const navigate = useNavigate()
  const hdlViewDetail = ()=> {
    navigate(`/singleproduct/${product.id}`)
  }


  const getListingWithZustand = useListingStored((state => state.getListingWithZustand))
  //----------------------------------------------------
  const hdlUpdateProduct=async(id)=>{
      const res = await getListingWithZustand(id,token)
    if (res.success) {
        //open view cart page
        navigate('/user/editlisting')
    } else {
        createAlert("info", "update error")
    }

  }
    
  return (
    <div className="card glass w-80 rounded-none">
    <figure>
        <img className='h-[300px]'
        src= {imgSrc }
        alt="car!" />
    </figure>
    <div className="card-body">
        <h2 className="card-title">{product.productName}</h2>
        <p> {product.description} </p>
        <p className='font-semibold text-amber-700'> { numeral(product.price).format(0,0) } </p>

                    {isSeller && (  
                                
                                <div className='flex justify-end gap-2 '> 
                                 <p onClick={()=>hdlUpdateProduct(product.id)} 
                                    className='hover:underline hover:text-yellow-600 hover:cursor-pointer'> EDIT </p>  :  
                                 <p onClick={()=>hdlDelete(product.id)}
                                    className='hover:underline hover:text-yellow-600 hover:cursor-pointer'> DELETE</p> 
                                
                                </div>)
                    }


        <div className="card-actions justify-end">
        <button className="btn "
                onClick={hdlViewDetail}>View Details</button>
        </div>
    </div>
</div>
  )
}

export default Productcards