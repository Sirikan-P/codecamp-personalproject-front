//connect authend backend

import axios from "axios";


export const actionRegister = async (value)=>{
    return await axios.post('http://localhost:8001/api/register',value)
}


export const actionLogin = async( value)=>{
    return await axios.post('http://localhost:8001/api/login',value)
}


//current User get role
export const actionCurrentUser = async(token)=>{
    return await axios.get('http://localhost:8001/api/currentuser',{
        headers: { 
            Authorization:`Bearer ${token}`
        }
    })
} 

//update user profile
export const actionUpdateProfile = async(value,token,id) => {

    return await axios.patch(`http://localhost:8001/api/user/${id}`, value , {
        headers: { 
            Authorization:`Bearer ${token}`
        }
    })
}