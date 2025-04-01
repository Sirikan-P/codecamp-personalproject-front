import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import numeral from 'numeral';


import useProductStored from '../store/product-store';
import { actionGetSingleProduct } from '../api/search';
import useAuthStore from '../store/auth-store';
import { createAlert } from '../utils/createAlert';


/////image slider-------------------
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function SingleProduct() {
    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState({})
    const [isSeller,setIsSeller] =useState(false)

    //zustand : global state
    const user = useAuthStore(state => state.user)
    const token = useAuthStore(state => state.token)

    const getSingleProduct = async (id) => {
        try {
            //console.log('go api')
            const res = await actionGetSingleProduct(id)
            const { product } = res.data

            setSingleProduct(product)

            if(user.id === product.sellerId) {
                setIsSeller(true)       
            } 
            return { success: true }
        } catch (error) {
            return { success: false, error: error.response?.data?.message } //object
        }
    }

    //console.log("test", singleProduct)
    useEffect(() => { getSingleProduct(id) }, [])

    //----------------------------------------------------
    const [qty, SetQty] = useState(1)
    const hdlQty = (num) => {
        const newQty = qty + num
        //console.log(newQty)
        if (newQty > 0 && newQty <= singleProduct.qty) {
            SetQty(newQty)
        }
    }
    const imageArray = singleProduct.ProductImage ? singleProduct.ProductImage : []

    //----------------------------------------------------
    const AddProductCartWithZustand = useProductStored(state => state.AddProductCartWithZustand)
    const navigate = useNavigate()
    const hdlAddtoCart = async (user, id) => {
        //check log-in 
        //console.log(user.id)
        if (!user.id) {
            createAlert("info", "please log-in or register")
        } else
        if(isSeller) {
            createAlert("info", "cannot buy your item")
        } else {
            //save product to cart
            const value = {
                productId: id,
                qty: qty
            }
            //console.log(value)
            //console.log(token)

            const res = await AddProductCartWithZustand(value, token)
            //console.log(res)
            if (res.success) {
                //open view cart page
                navigate('/user/cart')
            } else {
                createAlert("info", "add cart fail")
            }
        }
    }


    return (
        <>
            <div className='flex justify-center  
                w-full 
                gap-20
                p-24 py-4'>

                <div className=' flex flex-col w-full border p-4 m-auto'>                     
                    <div className="h-[520px] py-10 lg:py-24  m-auto">
                        <Carousel autoPlay showArrows={true} infiniteLoop>

                            {imageArray && imageArray.map(item => {
                                return <img src={item.imageUrl} key={item.id} />
                            })}

                        </Carousel>
                    </div>

                    {/* mock ui */}
                    <section className="py-10 lg:py-24 relative ">

                        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 lg:gap-16 ">
                                <div className="w-full flex flex-col justify-center order-last ">
                                    <h2 className='text-3xl mb-2 m-auto '>Product Details</h2>
                                    <p className="font-medium text-lg text-yellow-700 mb-4">
                                        {singleProduct?.type} &nbsp; / &nbsp; {singleProduct?.style}
                                    </p>
                                    <h2 className="mb-2  font-bold text-3xl leading-10 text-gray-900">
                                        {singleProduct?.productName}
                                    </h2>                          
                                    <p className='text-xl italic'> { singleProduct?.seller?.shopName?.toUpperCase() } </p>           
                                    <div className="flex flex-col sm:flex-row sm:items-center mb-6">                                                                  
                                        
                                        
                                        <h6 className=" font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                                            {numeral(singleProduct?.price).format(0,0) } : THB </h6>
                                        <p> Qty available : {singleProduct?.qty}</p>
                                    </div>

                                    <p className="text-gray-500 text-base font-normal mb-8 ">
                                        the perfect companion for your next adventure! Embrace the spirit of sunny escapades with this
                                        vibrant and versatile bag designed to cater to your travel needs while adding a pop of color to
                                        your journey.
                                    </p>


                                    <div className="block w-full">

                                        <div className="text">
                                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mb-8">
                                                <div className="flex items-center justify-center w-full">
                                                    <div
                                                        onClick={() => hdlQty(-1)}
                                                        className="group py-4 px-6 border border-gray-400 rounded-l-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50">
                                                        <svg className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                                                            width="22" height="22" viewBox="0 0 22 22" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                                                strokeLinecap="round" />
                                                            <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                                                strokeLinecap="round" />
                                                            <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                                                strokeLinecap="round" />
                                                        </svg>
                                                    </div>
                                                    <div className="font-semibold text-gray-900 text-lg py-[13px] px-6 w-full lg:max-w-[118px] border-y border-gray-400 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50 focus-within:bg-gray-50 outline-0"
                                                    > {qty} </div>
                                                    <div
                                                        onClick={() => hdlQty(+1)}
                                                        className="group py-4 px-6 border border-gray-400 rounded-r-full shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-300 hover:bg-gray-50">
                                                        <svg className="stroke-gray-700 transition-all duration-500 group-hover:stroke-black"
                                                            width="22" height="22" viewBox="0 0 22 22" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                                                strokeLinecap="round" />
                                                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                                                strokeWidth="1.6" strokeLinecap="round" />
                                                            <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                                                strokeWidth="1.6" strokeLinecap="round" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => hdlAddtoCart(user, id)}
                                                    className="group py-4 px-5 rounded-[8px] bg-yellow-300 font-semibold text-lg 
                                                        w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500
                                                        hover:bg-yellow-100 hover:shadow-yellow-200">

                                                    ADD TO CART</button>

                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    className="text-center w-full px-5 py-4 rounded-[8px] bg-yellow-600 flex items-center justify-center font-semibold text-lg shadow-sm transition-all duration-500 hover:bg-yellow-700 hover:shadow-yellow-400">
                                                    BUY NOW
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                    {/* mock ui */}

                </div>
            </div>
        </>
    )
}

export default SingleProduct