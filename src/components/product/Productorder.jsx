import React from 'react'

function Productorder(props) {
  const {singleProduct} = props
  const imageArray = singleProduct?.product?.ProductImage ? singleProduct?.product?.ProductImage : []

  return (
    <div> 
     <div className="rounded-2xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">
          <div className="col-span-12 lg:col-span-2 img box">
            <img src= {imageArray[0]?.imageUrl} alt="image" 
              className="max-lg:w-full lg:w-[180px] rounded-lg object-cover" />
          </div>
          <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
            <div className="flex items-center justify-between w-full mb-4">
              <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
              {singleProduct.product?.productName} </h5>

            </div>
            <p className="font-normal text-base leading-7 text-gray-500 mb-6">
              { singleProduct.product?.description} 
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                  <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                    width="18" height="19" viewBox="0 0 18 19" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 9.5H13.5" stroke="" strokeWidth="1.6" strokeLinecap="round"
                      strokeLinejoin="round" />
                  </svg>
                </button>
                <input type="text" id="number"
                  className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100  text-center"
                  placeholder={ singleProduct?.qty}  />
                <button
                  className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
                  <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                    width="18" height="19" viewBox="0 0 18 19" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.75 9.5H14.25M9 14.75V4.25" stroke="" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <h6 className="text-yellow-600 font-manrope font-bold text-2xl leading-9 text-right">
              { singleProduct.product?.price} THB </h6>
            </div>
          </div>
        </div> 
  </div>
  )
}

export default Productorder