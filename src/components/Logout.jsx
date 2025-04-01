import React from 'react'
import useAuthStore from '../store/auth-store';
import { useNavigate } from 'react-router';
import { createAlert } from '../utils/createAlert';


function Logout() {
    const actionLogout = useAuthStore( (state)=> state.actionLogout )
    const navigate = useNavigate();

    const hdlLogout = () => {
        createAlert("success", "Logout Sucess");

        actionLogout()
        navigate("/");
    }


  return (
    <> 
    <div onClick={hdlLogout} className='cursor-pointer' >Logout</div>
    </>
  )
}

export default Logout