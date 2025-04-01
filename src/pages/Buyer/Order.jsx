import React, { useEffect } from 'react'
import useAuthStore from '../../store/auth-store'
import useOrderStored from '../../store/order-store'
import Productorder from '../../components/product/Productorder'
import { useNavigate } from 'react-router'
import OrderSingle from '../../components/order/OrderSingle'

function Order() {
      //zustand : global state
      const user = useAuthStore(state => state.user)
      const token = useAuthStore (state => state.token)    

      const justorder = useOrderStored(state => state.justorder)   
      const getOrderWithZustand = useOrderStored(state => state.getOrderWithZustand) 

      useEffect(() => { getOrderWithZustand(token) }, [])
      console.log("global store",justorder)
      const productsOrder = justorder.OrderProduct //product array
      const navigate = useNavigate()

      const  hdlPayment = () => {
        navigate(`/user/checkout/${justorder.id}`)
      }
  return (
    <>
    <div className="py-6 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto ">

        <h2 className="title font-bold text-2xl leading-10 mb-8 text-center text-black">
          Order : {justorder.id} 
        </h2>          
        {productsOrder && productsOrder.map( item =>{ 
          return  <Productorder singleProduct={item} key={item.id}/>
          })
        } 

        <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
          <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
            Total
          </h5>

          <div className="flex items-center justify-between gap-5 ">
            <button
              className="rounded-full py-2.5 px-3 bg-indigo-50 text-yellow-600 font-semibold text-xs text-center whitespace-nowrap transition-all duration-500 hover:bg-indigo-100">Promo
              Code?</button>
            <h6 className="font-manrope font-bold text-3xl lead-10 text-yellow-600">
              {justorder.totalPrice} THB
            </h6>
          </div>
        </div>

          <div className="max-lg:max-w-lg max-lg:mx-auto">
          <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">Shipping taxes, and discounts
            calculated
            at checkout</p>
          <button
            onClick={ ()=> hdlPayment() }
            className="rounded-full py-4 px-6 bg-yellow-600 font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-yellow-500 ">
              Payment
          </button>

        </div>
      </div>
    </div>

  </>   
  )
}

export default Order