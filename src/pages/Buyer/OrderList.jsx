import React, { useEffect } from 'react'

import useAuthStore from '../../store/auth-store'
import useOrderStored from '../../store/order-store'
import OrderSingle from '../../components/order/OrderSingle'

function OrderList() {

  //zustand : global state
  const user = useAuthStore(state => state.user)
  const token = useAuthStore (state => state.token)
  const getOrderListWithZustand = useOrderStored (state => state.getOrderListWithZustand)
  const orders = useOrderStored(state => state.orders)
  
  useEffect(() => { getOrderListWithZustand(token) }, [])

  console.log("orderlist" ,orders)

  return (
<>
    <div className="py-6 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto ">


        <h2 className="title font-bold text-2xl leading-10 mb-8 text-center text-black">
          user first name : {user.firstname} 
        </h2>          
        {orders && orders.map( item =>{ 
          return  <OrderSingle singleOrder={item} key={item.id}/>
          })
        } 


      </div>
    </div>

  </>   
  )
}

export default OrderList