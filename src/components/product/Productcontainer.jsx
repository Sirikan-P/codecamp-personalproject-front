import React from 'react'

import Productcards from './Productcards'

function Productcontainer(props) {

  const {AllProducts, searchby} = props
  return (
    <div>         
    <div className='text-2xl text-center py-12'> 
      <p className='italic text-3xl font-extrabold'> CATCH YOUR FUR ... </p>
      <p> Shop search by : {searchby } </p> 
    </div>
    <div className='flex flex-wrap justify-center px-12 py-6 gap-12' >
      
      {AllProducts.map(el => (
        <Productcards key={el.id} product={el} />
      ))
      }

    </div>
  </div>
  )
}

export default Productcontainer