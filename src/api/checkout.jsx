//connect search product  backend

import axios from "axios";

//payment
export const actionCheckOut = async ( token , id)=>{

    return await axios.post('http://localhost:8001/api/payment/checkout',{ id }, {
        headers: { 
            Authorization:`Bearer ${token}`
        }
    })
}

export const actionCheckOutStatus = async ( token , session)=>{

  return await axios.get('http://localhost:8001/api/payment/checkout-status/' + session , {
      headers: { 
          Authorization:`Bearer ${token}`
      }
  })
}