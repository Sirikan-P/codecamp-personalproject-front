//global state 
import { create } from "zustand"
import { persist } from "zustand/middleware"

//api 
import { actionLogin, actionUpdateProfile } from "../api/auth"

//step 1 : create Store
const authStored = (set) => ({
    user:{}, // state 1
    token: null, // state 2
    // function 
    actionLoginWithZustand: async (value)=> {
        try {
            const res = await actionLogin(value)
                // console.log("hello, zustand ddd",res)

            const { payload , token , user } = res.data

            //set state 
            set( { 
                    token:token ,
                    user:user
            })
            return { success: true , user : user } //object

        } catch (error) {
            return { success: false, error: error.response?.data?.message} //object
        }
    },
    //function logout
    actionLogout: () => {
        set( {user:{}, token:null})
    },
    //function update user
    actionUpdateProfileWithZustand: async (value,token,id) => {
        try {
            //console.log("hello, zustand ddd",value)
            const res = await actionUpdateProfile(value,token,id)
            console.log(res)
            const { data } = res.data
            
            //set state 
            set( { 
                        user:data
                    })
            return { success: true , user : data } //object
        } catch (error) {
            return { success: false, error: error.response?.data?.message} //object
        }
    }
})

//step 2 : export Store
const useAuthStore = create(persist(authStored,{name:'auth-store'})) //persist = localstorage 
export default useAuthStore