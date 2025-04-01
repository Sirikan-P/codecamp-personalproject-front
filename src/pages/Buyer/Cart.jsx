import React, { useEffect, useState } from 'react'
import Productcart from '../../components/product/Productcart'
import useProductStored from '../../store/product-store'
import useAuthStore from '../../store/auth-store'
import { actionGetCart } from '../../api/cart'
import useOrderStored from '../../store/order-store'
import { createAlert } from '../../utils/createAlert'
import { useNavigate } from 'react-router'

function Cart() {
      //zustand : global state
  const user = useAuthStore(state => state.user)
  const token = useAuthStore (state => state.token)
  
  //const [productsCart, SetProductsCart] = useState([])
  const productsCart = useProductStored(state => state.productsCart)
  const getMyCartWithZustand = useProductStored(state => state.getMyCartWithZustand)

  const subTotalPrice = useProductStored(state => state.subTotalPrice)  
      //console.log(token)
  
  useEffect(() => { getMyCartWithZustand(token) }, [])

  console.log(productsCart)
  const AddNewOrderWithZustand = useOrderStored(state => state.AddNewOrderWithZustand)
  const navigate = useNavigate()

  
const hdlOrder = async(productsCart,token,user)=>{                                       
      console.log(productsCart,token,user) //array 
      const value = {}
      //api order --payment in-process
        if (!user.id) {
            createAlert("info", "please log-in or register")
        } else {
            //save to order delete from cart
            const res = await AddNewOrderWithZustand(value,token)
            //console.log(res)
            if (res.success) {
                //open view cart page
                navigate('/user/order')
            } else {
                createAlert("info", "add cart fail")
            }
        }

      //page check out complete 
}
  return (
    <>
      <div className="py-6 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto ">

          <h2 className="title font-bold text-2xl leading-10 mb-8 text-center text-black">
            Shopping Cart
          </h2>          
          {productsCart && productsCart.map( item =>{ 
            return  <Productcart productInCart={item} key={item.id}/>
            })
          }         

          <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
            <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
              Subtotal
            </h5>

            <div className="flex items-center justify-between gap-5 ">
              <button
                className="rounded-full py-2.5 px-3 bg-indigo-50 text-yellow-600 font-semibold text-xs text-center whitespace-nowrap transition-all duration-500 hover:bg-indigo-100">Promo
                Code?</button>
              <h6 className="font-manrope font-bold text-3xl lead-10 text-yellow-600">
                {subTotalPrice} THB
              </h6>
            </div>
          </div>

            <div className="max-lg:max-w-lg max-lg:mx-auto">
            <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">Shipping taxes, and discounts
              calculated
              at checkout</p>
            <button
              onClick={()=>hdlOrder(productsCart,token,user)} 
              className="rounded-full py-4 px-6 bg-yellow-600 font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-yellow-500 ">
                Checkout
            </button>

          </div>
        </div>
      </div>

    </>        
  )
}

export default Cart