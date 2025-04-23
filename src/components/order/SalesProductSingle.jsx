import React from 'react'

function SalesProductSingle(props) {
  const {singleProduct} = props
  const imgSrc = singleProduct?.ProductImage ? singleProduct?.ProductImage[0]?.imageUrl : ''
  const orderArray = singleProduct?.OrderProduct? singleProduct.OrderProduct : []



  return (
    <div className="rounded-2xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
    <figure className="col-span-4 px-4">
        <img className='h-[200px]'
        src= {imgSrc }
        alt="car!" />
    </figure>
    <div className="col-span-8 lg:col-span-10 detail lg:pl-3">
      <div className="flex items-center justify-between w-full mb-4">
        <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
        Product name {singleProduct?.productName} 
        </h5>
      </div>
      <div className="flex flex-col justify-between">

        <h6 className="text-yellow-600 font-manrope font-bold text-2xl leading-9 ">
        { singleProduct.price} THB </h6>
        <p>Delivery fee { singleProduct.deliveryFee } THB  </p>
      </div>

      {orderArray && orderArray.map( item =>{ 
        return  <div className="flex  gap-8 font-normal text-base leading-7 text-gray-500 mb-6 py-4">
              <p> Order ID : {item.orderId}   </p>  
              <p> Order status : {item.order.orderStatus}  </p>
              <p> Payment status : {item.order.paymentStatus} </p> 
            </div>
             
        
        })
      } 


      </div>
    </div>
  )
}

export default SalesProductSingle