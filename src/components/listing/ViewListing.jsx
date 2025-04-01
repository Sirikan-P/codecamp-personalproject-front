import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { actionGetMyListing } from '../../api/listing'
import useAuthStore from '../../store/auth-store';
import Productcards from '../product/Productcards'
import { createAlert, createConfirmAlert } from '../../utils/createAlert';
import useListingStored from '../../store/listing-store';

function ViewListing() {
const [listing,setListing] = useState([])

//zustand : global state
const user = useAuthStore(state => state.user)
const token = useAuthStore (state => state.token)  

const getMyListing = async() => {
  try {
 
      const res = await actionGetMyListing(token,user.id) 
      
      const { products } = res.data
      //console.log(products)
      setListing( products )
      //console.log(newProduct )
       return ("success")
  } catch (error) {
        console.log(error)
       return ("fail")
  }
}
useEffect( ()=>{ getMyListing() } ,[])


//----------------------------------------------------
//zustand : product
const deleteListingWithZustand = useListingStored((state => state.deleteListingWithZustand))

const hdlDelete = async(id) => {
    //are you sure 
  try {      
    createConfirmAlert( async() => {
      console.log("Deleting item after click");
    //  ลบข้อมูลที่นี่ เช่น API call ไปลบใน Database
      const res = await deleteListingWithZustand(id,token)
      console.log("res",res)
        if (res.success) {
          //open view cart page
          navigate('/user/listing')
        }
      }
      )
  } catch (error) {
    createAlert("info", "delete fail")
  } 
}


  
  return (
    <div> 
    <p className='italic text-3xl font-extrabold text-center p-6 ' >show my Listing</p>
    {/* product card --start */}
    <div className='flex flex-wrap justify-center px-12 gap-12' >
        
        {listing.map(el => (
          <Productcards key={el.id} product={el} isSeller={true} hdlDelete={hdlDelete} />
        ))
        }

      </div>
    {/* product card --end */}
    </div>
  )
}

export default ViewListing