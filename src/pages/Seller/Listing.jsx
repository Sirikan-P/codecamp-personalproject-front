import React from 'react'
import ViewListing from '../../components/listing/ViewListing'
import { useNavigate } from "react-router"

function Listing() {
    //use navigate function
  const navigate = useNavigate()
  const hdlRedirect = ()=>{
    navigate('/user/createlisting')
  }
  return (
    <div> 
        <div className='flex flex-col text-center m-auto py-6'>
          <p className='text-3xl '>Let's start listing your furniture.</p>
          <p >This should only take a few minutes.</p> 
          <button className="btn btn-wide bg-yellow-600 border-0  m-auto my-4"
                  onClick={hdlRedirect}
          >Create Listing
          </button>
        </div>

       <ViewListing />


    </div>
  )
}

export default Listing