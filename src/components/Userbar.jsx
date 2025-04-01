import React from 'react'
import { Link } from 'react-router'

function Userbar() {
  return (
    <div className='flex justify-center
            m-auto
            font-normal
            text-sm  text-black
            py-4'>
            <div className='flex justify-center space-x-6
                      w-[700px]                      '>
                <Link className='hover:border-b-2' to="/user">My Profile</Link>
                <Link className='hover:border-b-2' to="/user/cart">My Cart</Link>
                <Link className='hover:border-b-2' to="/user/order">My Order</Link>
                <Link className='hover:border-b-2' to="/user/orderlist">My OrderList</Link>
                <Link className='hover:border-b-2' to="/user/review">My Review</Link>
                <Link className='hover:border-b-2' to="/user/listing">My Shop</Link>
                <Link className='hover:border-b-2' to="/user/sales">Sales Product</Link>
          </div>
          
    </div>
  )
}

export default Userbar