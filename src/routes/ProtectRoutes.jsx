import React, { useEffect, useState } from 'react'
import useAuthStore from '../store/auth-store'

function ProtectRoutes( {el , allows } ) {
    const [ok,setOk] = useState(null)   
    const user = useAuthStore( (state)=> state.user)

    const checkPermission = async()=>{
        if(user.id) {
            setOk(allows.includes("USER"))
        }else{
            setOk(false) //usestate
        }
    }

  useEffect ( ()=>{
    checkPermission()
  },[])  

  if (ok ===null) {
      return <h1>Loading...</h1>
  }
  if(!ok) {
      return <h1>Unauthorized </h1>
  }
return el 
}

export default ProtectRoutes