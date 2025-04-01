import React, { useEffect, useState } from 'react'
import Productcards from '../product/Productcards'
import { actionGetNewProduct } from '../../api/search'

function NewProduct() {
const [newProduct,setNewProduct] = useState([])

const getNewProduct = async() => {
  try {
 
      const limit = 4 
      const res = await actionGetNewProduct(limit) 
      
      const { products } = res.data
      //console.log(products)
      setNewProduct( products )
      //console.log(newProduct )
       return ("success")
  } catch (error) {
        console.log(error)
       return ("fail")
  }
}
useEffect( ()=>{ getNewProduct() } ,[])

  return (
    <div>         
      <div className='text-2xl text-center py-6'> 
        <p className='italic text-3xl font-extrabold'> CATCH YOUR FUR ... </p>
        <p>New Product</p> 
      </div>
      <div className='flex flex-wrap justify-center px-12 gap-12' >
        
        {newProduct.map(el => (
          <Productcards key={el.id} product={el} />
        ))
        }

      </div>
    </div>
  )
}

export default NewProduct