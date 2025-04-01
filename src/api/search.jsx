//connect search product  backend

import axios from "axios";

//home page 
export const actionGetNewProduct = async (limit)=>{

    return await axios.get(`http://localhost:8001/api/search?limit=${limit}`)
}

//shop page 
export const actionGetAllProduct = async(category,keyword,minprice,maxprice) =>{

    //console.log("axios",category)
    return await axios.get(`http://localhost:8001/api/search?category=${category}&keyword=${keyword}`)
}

//view detail page 
export const actionGetSingleProduct = async(productId) =>{

    return await axios.get(`http://localhost:8001/api/product/${productId}`)
}