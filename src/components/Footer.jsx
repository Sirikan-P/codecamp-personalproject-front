import React from 'react'

function Footer() {
  return (
    <>
    <div className="divider my-0"></div>
    <footer className='flex w-full px-24 py-6 font-medium'>         
        <div className='flex flex-col w-2/6'>
            <div className='py-4'>FURCATCHER</div>
            <div className='text-gray-400'>address</div>
        </div>
        <div className='flex flex-col w-1/6'> 
            <div className='text-gray-400 py-4'>link</div>
            <div>Home</div>
            <div>Shop</div>
            <div>Contact</div>
        </div>
        <div className='flex flex-col w-1/6'>
            <div className='text-gray-400 py-4'>Help</div>
            <div>About us</div>
            <div>Seller Guide</div>
            <div>Returns </div>
        </div>
        <div className='flex flex-col w-1/6'>
            <div className='text-gray-400 py-4'>Newsletter</div>
            <div>SUBSCRIBE</div>
        </div>
    </footer>
    <div className="border-b my-0 mx-16"></div>
    <p className='flex justify-center text-xs py-4'> All rights reserved </p>
    </>
  )
}

export default Footer