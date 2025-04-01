import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import Userbar from '../components/Userbar'

function LayoutUser() {
  return (
    <div>
        <Navbar />
        <Userbar />
        <Outlet />

        <Footer />
    </div>
  )
}

export default LayoutUser