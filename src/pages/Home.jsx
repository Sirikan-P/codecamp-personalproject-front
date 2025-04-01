import React from 'react'
import Sustain from '../components/home/Sustain'
import ShopbyRoom from '../components/home/ShopbyRoom'
import Landing from '../components/home/Landing'
import NewProduct from '../components/home/NewProduct'

function Home() {
  return (
    <div > 
    <Landing />
    <NewProduct />
    <ShopbyRoom />
    <Sustain />
    </div>
  )
}

export default Home