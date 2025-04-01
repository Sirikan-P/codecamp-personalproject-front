import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { actionCheckOutStatus } from '../../api/checkout'
import { createAlert } from '../../utils/createAlert'
import useAuthStore from '../../store/auth-store'

function CheckoutComplete() {
  const navigate = useNavigate()
  const token = useAuthStore (state => state.token)
  const { session } = useParams()


  useEffect ( ()=> {
    checkSession()
  },[])


  const checkSession = async()=>{
    if(!session) return
  
  try {
    const res = await actionCheckOutStatus (token , session)
    createAlert("success",res.data.message || "Payment Successfully")
    navigate("/user/orderlist")
  } catch (error) {
    createAlert("error" ,"failed to verify payment")
    console.error("Payment verify error:" , error)
  }
  }
  return (
    <div> loading ... </div>
  )
}

export default CheckoutComplete