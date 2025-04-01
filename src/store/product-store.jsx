//global state 
import { create } from "zustand"
import { persist } from "zustand/middleware"


//api 
import { actionAddProductCart, actionGetCart, actionRemoveProductCart } from "../api/cart"

//step 1 : create Store
const productStored = (set) => ({
    productsCart: [] ,
    singleProduct: {} , 
    subTotalPrice: 0 ,

    AddProductCartWithZustand: async(value,token) => {
        try {
           
            const res = await actionAddProductCart(value,token)
            //console.log('api',res)
            const { products } = res.data
            return { success: true , data : products } //object
        } catch (error) {
            return { success: false, error: error.response?.data?.message} //object
        }
    },

    getSubTotalPrice: (price) => {
        console.log("get",price)
        set((state) => ({
            subTotalPrice: state.subTotalPrice + price
        }));
    },

    getMyCartWithZustand: async (token) => {
         try {
            const res = await actionGetCart(token)
            const { cartItems , subTotalPrice } = res.data

            set((state) => ({
                productsCart: cartItems, // ต่อ array เดิมกับค่าใหม่
            }));
            set((state) => ({
                subTotalPrice: subTotalPrice, // ต่อ array เดิมกับค่าใหม่
            }));
            
            return { success: true  }
         } catch (error) {
            return { success: false, error: error.response?.data?.message } //object
         }
      },

      removeProductWithZustand: async(value ,token,key ) => {
        try {
            const res = await actionRemoveProductCart(value ,token)
            
            const { cartItems ,subTotalPrice } = res.data
            
            set((state) => ({
                productsCart: cartItems 
            }));
            set((state) => ({
                subTotalPrice: subTotalPrice
            }));
            return { success: true  , data : res.data } 

        } catch (error) {
            return { success: false, error: error.response?.data?.message } //object
        }
      }
})


//step 2 : export Store
//const useProductStored = create(persist( productStored, {name: 'product-store'}) )
const useProductStored = create(productStored)

export default useProductStored
