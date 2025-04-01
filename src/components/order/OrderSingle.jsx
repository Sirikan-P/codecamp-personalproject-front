import React from 'react'
import useOrderStored from '../../store/order-store'
import { useNavigate } from 'react-router'
import useAuthStore from '../../store/auth-store'
import { createAlert } from '../../utils/createAlert'

function OrderSingle(props) {
  const {singleOrder} = props

  const user = useAuthStore(state => state.user)
  const token = useAuthStore (state => state.token)
  const setOrderStatusWithZustand = useOrderStored(state => state.setOrderStatusWithZustand)
  const navigate = useNavigate()

  console.log("orderid", singleOrder)  

  const hdlRecieve = async()=>{
    
    const value = {
      orderStatus : "COMPLETE"
    }
    try {
        //console.log('go api')
        const res = await setOrderStatusWithZustand(value,token,singleOrder.id)        
        createAlert("success" ,"Complete order , Thank you")
        return { success: true , data: res.data }
    } catch (error) {
        return { success: false, error: error.response?.data?.message } //object
    }
  }

  const  hdlreview= async(reviewText,reviewScore)=>{
    console.log(reviewText,reviewScore)
    
  }
  return (
<div> 
     <div className="rounded-2xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4 ">

          <div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
            <div className="flex items-center justify-between w-full mb-4">
              <h5 className="font-manrope font-bold text-2xl leading-9 text-gray-900">
              {singleOrder.id} 
              </h5>
            </div>
            <p className="font-normal text-base leading-7 text-gray-500 mb-6">
              Order status {singleOrder.orderStatus} 
            </p>
            <p className="font-normal text-base leading-7 text-gray-500 mb-6">
              Payment status{singleOrder.paymentStatus} 
            </p>
            <div className="flex justify-between items-center">

              <h6 className="text-yellow-600 font-manrope font-bold text-2xl leading-9 text-right">
              { singleOrder.totalPrice} THB </h6>
            </div>
            <button
              onClick={() => hdlRecieve()}
              className="group py-4 px-5 rounded-[8px] bg-yellow-300 font-semibold text-lg 
                  w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500
                  hover:bg-yellow-100 hover:shadow-yellow-200">
              RECEIVED 
            </button>

            <button className="btn  w-full flex bg-yellow-600 my-4" onClick={()=>document.getElementById('my_modal_1').showModal()}> REVIEW PRODUCT </button>
            <dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello review !</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form onSubmit={(e) => { 
          e.preventDefault();  // ป้องกันการรีเฟรชและการปิด modal 
          const reviewText = e.target.querySelector('textarea').value; // ดึงค่า textarea
          const reviewScore = e.target.querySelector('input').value; // ดึงค่า textarea
          hdlreview(reviewText,reviewScore); // ส่งค่า reviewText ให้ฟังก์ชัน hdlreview
          document.getElementById('my_modal_1').close()
        }} className='flex flex-col w-full'>
        {/* ฟอร์มนี้จะไม่ปิด modal อัตโนมัติ */}
        <textarea className="textarea" placeholder="your review..."></textarea>
        <input className="input" type="text" placeholder="YOUR SCORE 1-5"  />
        <div className='flex gap-4 py-4'>
          <button type="submit" className="btn flex-grow bg-yellow-300">Submit</button> 
          <button type="button" className="btn flex-grow" onClick={() => document.getElementById('my_modal_1').close()}>Close</button>
        </div>                    
      </form>
    </div>
  </div>
</dialog>
          </div>
        </div> 
  </div>
  )
}

export default OrderSingle