//global state 
import { create } from "zustand"
import { persist } from "zustand/middleware"

//api 
import { actionCreateListing, actionDeleteListing, actionGetCurrentListing, actionUpdateListing } from "../api/listing"

//step 1 : create Store
const ListingStored = (set) => ({
    lists:[],
    currentListing: {},
    createListingWithZustand: async (value ,token)=>{
        try {
            //console.log("hello, zustand ddd",value , token ,userId)
            const res = await actionCreateListing(value,token)

            console.log('res',res)
            const { data } = res.data

            return { success: true , data : data } //object
        } catch (error) {
            return { success: false, error: error.response?.data?.message} //object
        }
    } ,
    deleteListingWithZustand: async (value ,token)=>{
        try {
            //console.log("hello, zustand ddd",value , token)
            const res = await actionDeleteListing(value,token)
            console.log('zustand',res)

            return { success: true  } //object
        } catch (error) {
            return { success: false, error: error.response?.data?.message} //object
        }
    },
    updateListingWithZustand: async (value ,token,productId)=>{
        try {
            //console.log("hello, zustand ddd",value , token ,userId)
            const res = await actionUpdateListing(value,token,productId)

            console.log('res',res)
            const { data } = res.data
            set({
                currentListing : data
            })
            return { success: true , data : data } //object
        } catch (error) {
            return { success: false, error: error.response?.data?.message} //object
        }
    },
    getListingWithZustand: async (value ,token )=>{
        try {
            //console.log("hello, zustand ddd",value , token ,userId)
            const res = await actionGetCurrentListing(value,token)

            console.log('res',res)

            const { product } = res.data
            set({
                currentListing : product
            })
            return { success: true , data : product } //object
        } catch (error) {
            return { success: false, error: error.response?.data?.message} //object
        }
    }
})


//step 2 : export Store
const useListingStored = create(ListingStored)

export default useListingStored