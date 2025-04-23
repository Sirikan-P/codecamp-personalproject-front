//connect search product  backend

import axios from "axios";


export const actionAddNewOrder = async (value , token)=>{

  return await axios.post('http://localhost:8001/api/order/checkout',value, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}


export const actionGetOrderfromCart = async (token)=>{  

  return await axios.get(`http://localhost:8001/api/order/buyer/detail`, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}

export const actionGetOrder = async (token,orderId)=>{
  

  return await axios.get(`http://localhost:8001/api/order/buyer/detail/${orderId}`, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}

export const actionGetOrderList = async (token)=>{
  

  return await axios.get('http://localhost:8001/api/order/buyer/list', {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}

export const actionSetOrderStatus = async (value,token,orderId)=>{  

  return await axios.patch(`http://localhost:8001/api/order/${orderId}`, value,{
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}

export const actionGetSalesProduct = async (token)=>{  

  return await axios.get(`http://localhost:8001/api/order/seller`, {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}