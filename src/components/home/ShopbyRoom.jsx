import React from 'react'
import { Link } from 'react-router'

function ShopbyRoom() {
  return (
    <div>
      <div className=' text-center py-12'>
        <p className='text-2xl'>Shop by room</p>
        <p className='text-xl italic'>Designer's Top Pick</p>
      </div>
      <div className='flex flex-wrap justify-center px-12 gap-12' >


        <div className="card glass w-80 rounded-none">
          <figure className='h-[400px] '>
            <img className='object-contain max-w-full'
              src="https://images.unsplash.com/photo-1600607687126-8a3414349a51?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="car!" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-center  text-amber-700">   <Link to="/Shop?category=*&keyword=BEDROOM">BEDROOM</Link> </h2>
          </div>
        </div>
        <div className="card glass w-80 rounded-none">
          <figure className='h-[400px]'>
            <img className='object-contain max-w-full'
              src="https://images.unsplash.com/photo-1585264550534-7890a89b7270?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="car!" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-center  text-amber-700"> <Link to="/Shop?category=*&keyword=LIVINGROOM">LIVING ROOM</Link></h2>
          </div>
        </div>
        <div className="card glass w-80 rounded-none">
          <figure className='h-[400px]'>
            <img className='object-contain max-w-full'
              src="https://plus.unsplash.com/premium_photo-1671269943788-53b24f94d11c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="car!" />
          </figure>
          <div className="card-body">
            <h2 className="card-title  text-amber-700"> <Link to="/Shop?category=*&keyword=DININGROOM">DINING ROOM </Link></h2>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ShopbyRoom