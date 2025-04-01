//connect listing product  backend
import axios from "axios";

export const actionCreateListing = async (value , token )=>{
    //console.log('axios check',value,token)
    return await axios.post('http://localhost:8001/api/product',value, {
        headers: { 
            Authorization:`Bearer ${token}`
        }
    })
}

export const actionUpdateListing = async (value , token ,productId)=>{
    return await axios.patch(`http://localhost:8001/api/product/${productId}`,value, {
        headers: { 
            Authorization:`Bearer ${token}`
        }
    })
}

export const actionDeleteListing = async (productId , token )=>{
    console.log("axios",productId)
    return await axios.delete(`http://localhost:8001/api/product/${productId}`, {
        headers: { 
            Authorization:`Bearer ${token}`
        }
    })
}

export const actionGetMyListing = async(token ,userId) =>{

    return await axios.get(`http://localhost:8001/api/product/seller/${userId}`, {
        headers: { 
            Authorization:`Bearer ${token}`
        }
    })
}

export const actionGetCurrentListing = async(productId,token ) =>{

    return await axios.get(`http://localhost:8001/api/product/${productId}`, {
        headers: { 
            Authorization:`Bearer ${token}`
        }
    })
}