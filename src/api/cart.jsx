//connect search product  backend

import axios from "axios";

//home page 
export const actionAddProductCart = async (value , token)=>{

    console.log('axios check',value,token)
    return await axios.post('http://localhost:8001/api/cart',value, {
        headers: { 
            Authorization:`Bearer ${token}`
        }
    })
}

export const actionGetCart = async (token) =>{
    return await axios.get('http://localhost:8001/api/cart', {
        headers: { 
            Authorization:`Bearer ${token}`
        }
    })

}

export const actionRemoveProductCart = async (value ,token) =>{
    return await axios.post('http://localhost:8001/api/cart/remove', value ,{
        headers: { 
            Authorization:`Bearer ${token}`
        }
    })

}
