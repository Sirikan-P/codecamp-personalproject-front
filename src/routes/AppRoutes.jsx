import React from 'react'
import Layout from '../layouts/Layout'
import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import About from '../pages/About'
import Register from '../pages/Auth/Register'
import Login from '../pages/Auth/Login'
import Notfound from '../pages/Notfound'
import Shop from '../pages/Shop'
import MyProfile from '../pages/Auth/MyProfile'
import LayoutUser from '../layouts/LayoutUser'
import Cart from '../pages/Buyer/Cart'
import Order from '../pages/Buyer/Order'
import Review from '../pages/Buyer/Review'
import Listing from '../pages/Seller/Listing'
import CreateListing from '../pages/Seller/CreateListing'
import SalesProduct from '../pages/Seller/SalesProduct'
import SingleProduct from '../pages/SingleProduct'
import ProtectRoutes from './ProtectRoutes'
import Checkout from '../components/payment/Checkout'
import CheckoutComplete from '../components/payment/CheckoutComplete'
import OrderList from '../pages/Buyer/OrderList'
import UpdateListing from '../pages/Seller/UpdateListing'


function AppRoutes() {
  return (
    <>
        <Routes >
            {/* public */}
            < Route path="/" element={ < Layout /> }> 
                <Route index element= { < Home /> } /> 
                <Route path="about" element= { < About /> } /> 
                <Route path="shop" element= { < Shop /> } /> 
                <Route path="singleproduct/:id" element= { < SingleProduct /> } /> 
                <Route path ="register" element= { < Register /> }/>
                <Route path = "login" element = { <Login /> }/>
            </Route>

            {/* private [user] */}
            <Route path = "/user" element = { < ProtectRoutes  el={ <LayoutUser /> }
                                                allows={ ["USER","ADMIN"] }/>}
            >
                <Route index element= {<MyProfile /> } /> 
                <Route path='cart'element= { <Cart />} /> 
                <Route path='order'element= { <Order /> } /> 
                <Route path='orderlist'element= { <OrderList /> } /> 
                <Route path='review'element= { <Review /> } /> 
                <Route path='listing'element= { <Listing /> } /> 
                <Route path='createlisting' element = { <CreateListing />} />
                <Route path='editlisting' element = { <UpdateListing />} />
                <Route path='sales'element= { <SalesProduct /> } />

                {/* payment */}
                <Route path='checkout/:id'element= { <Checkout /> } /> 
                <Route path='complete/:session'element= { <CheckoutComplete /> } /> 
            </Route>

            {/* private [admin] */}
            <Route path="dashboard" element= { <h1>Dashboard </h1>}/>
            <Route path="manage" element= { <h1> Manage </h1>}/>
           
            <Route path="*" element={ < Notfound />} />
        </Routes>
    </>
  )
}

export default AppRoutes