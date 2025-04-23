 import React, { useEffect } from 'react'

import useAuthStore from '../../store/auth-store'
import useOrderStored from '../../store/order-store'
import SalesProductSingle from '../../components/order/SalesProductSingle'
 
function SalesProduct() {
//zustand : global state
const user = useAuthStore(state => state.user)
const token = useAuthStore (state => state.token)   

const salesProduct = useOrderStored(state => state.salesProduct) 
const getSalesProductWithZustand = useOrderStored(state => state.getSalesProductWithZustand) 

useEffect(() => { getSalesProductWithZustand(token) }, [])


   return (
    <div className="py-6 relative">
    <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto ">


      <h2 className="title font-bold text-2xl leading-10 mb-8 text-center text-black">
        Show Sale Items of : {user.firstname} {user.lastname} 
      </h2> 

      {salesProduct && salesProduct.map( item =>{ 
        return  <SalesProductSingle singleProduct={item} key={item.id}/>
        })
      } 


    </div>
  </div>
   )
 }
 
 export default SalesProduct