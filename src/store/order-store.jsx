//global state 
import { create } from "zustand"
import { persist } from "zustand/middleware"

//api 
import {actionAddNewOrder, actionGetOrderfromCart, actionGetOrderList, actionSetOrderStatus} from "../api/order"

//step 1 : create Store
const orderStored = (set) => ({
  justorder:{},
  orders:[],

  AddNewOrderWithZustand:  async (value,token)=>{
    try {

      const res = await actionAddNewOrder(value,token)
      const { order } = res.data

      set((state) => ({
        justorder: order, 
    }));

      return { success: true , data : order } //object
    } catch (error) {
      return { success: false, error: error.response?.data?.message} //object
    }

  },
  getOrderWithZustand: async (token) => {
    try {

      //console.log("zustand 1")
      const res = await actionGetOrderfromCart(token)
      //console.log("zustand",res)
      const { order } = res.data

      set((state) => ({
        justorder: order, 
      }));
      
      return { success: true  , data : orders }
    } catch (error) {
      return { success: false, error: error.response?.data?.message } //object
    }
},
  getOrderListWithZustand: async (token) => {
    try {

      const res = await actionGetOrderList(token)
      const { orders } = res.data

      set((state) => ({
          orders: orders, 
      }));
      
      return { success: true  , data : orders }
    } catch (error) {
      return { success: false, error: error.response?.data?.message } //object
    }
},

setOrderStatusWithZustand: async (value,token,orderId) => {
  try {

    const res = await actionSetOrderStatus(value,token,orderId)    
    return { success: true  , data : res.data }
  } catch (error) {
    return { success: false, error: error.response?.data?.message } //object
  }
},

})

//step 2 : export Store
//const useProductStored = create(persist( productStored, {name: 'product-store'}) )
const useOrderStored = create(orderStored)

export default useOrderStored