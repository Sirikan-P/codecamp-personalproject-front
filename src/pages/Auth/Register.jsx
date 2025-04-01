import React from 'react'

import { createAlert } from "../../utils/createAlert"
import { useForm } from "react-hook-form"

//form component
import RegisterInput from '../../components/form/RegisterInput'
import Buttons from '../../components/form/Buttons'

//validator
import { registerSchema } from "../../utils/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { actionRegister } from '../../api/auth'




function Register() {
//JS
const { register , handleSubmit ,formState ,reset } = useForm({
  //use validate
  resolver:zodResolver(registerSchema)
})

const {  isSubmitting , errors } = formState // boolean , error object
//console.log(errors)
//----------------------------------------
const hdlSubmit =  async (value)=>{ 
  //Deley 
  await new Promise((resolve) => setTimeout(resolve,2000) )
  try {
    const res = await actionRegister(value) 
    reset()
    createAlert("success","register success")
  } catch (error) {
    createAlert("info",error.response?.data?.message)
  }
}
//---------
  return (
    <div className="flex justify-center
        w-full h-[580px] 
        gap-20
        p-24 py-20
        bg-[url(/img/bg4.jpg)] bg-no-repeat bg-cover">
        <div className="
            w-[320px] border 
            p-4
            rounded-md  bg-white opacity-90"> 
            <h1 className="
                text-xl 
                font-bold 
                text-center"> Register </h1>
            <form onSubmit ={ handleSubmit(hdlSubmit) } >
                <div className="flex flex-col justify-center gap-2 py-4" >

                    <RegisterInput register={register} name = {"email"} errors={errors}/>
                    <RegisterInput register={register} name = {"firstname"} errors={errors}/>
                    <RegisterInput register={register} name = {"lastname"}  errors={errors}/>
                    <RegisterInput register={register} name = {"password"} type="password" errors={errors}/>
                    <RegisterInput register={register} name = {"confirmPassword"} type="password" errors={errors}/>

                </div>
                <div className="flex justify-center">
                    <Buttons isSubmitting={ isSubmitting } label={ "Register"} />                
                    
                </div>
            </form>
        </div> 
    </div>
  )
}

export default Register