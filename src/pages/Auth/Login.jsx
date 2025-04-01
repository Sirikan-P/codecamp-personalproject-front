import React from 'react'

import { createAlert } from "../../utils/createAlert"
import { useForm } from "react-hook-form"

//Navigate
import { useNavigate } from "react-router"

//validation
import { loginSchema } from "../../utils/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { actionLogin } from "../../api/auth"
import useAuthStore from "../../store/auth-store"


import FormInput from '../../components/form/FormInput'
import Buttons from '../../components/form/Buttons'
import RegisterInput from '../../components/form/RegisterInput'


function Login() {
//JS

  //zustand : global state
  const actionLoginWithZustand = useAuthStore( (state)=>state.actionLoginWithZustand)
  
  //use navigate function
  const navigate = useNavigate()

  //react hook form 
  const { register, handleSubmit, formState, reset } = useForm({
    //use validate
    resolver: zodResolver(loginSchema)
  })
  const { isSubmitting, errors } = formState // boolean , error object


  //react-hook-form
  const hdlSubmit = async (value) => {
    //Deley animation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const res = await actionLoginWithZustand(value) //value data from state
      // ---const res = await actionLogin(value)  
      // console.log(res.user.firstname)
      

      if(res.success){
        navigate('/user')
        reset()
        createAlert("success", "welcome back")
      }else{
        createAlert("info","something wrong")
      }
}

  return (
    <div className="flex justify-center
         w-full h-[520px] 
        gap-20
        p-24 py-20
        bg-[url(/img/bg2.jpg)] bg-no-repeat bg-cover"> 
      <div className="
            w-92 border 
            p-4
            rounded-md bg-white opacity-90">
        <h1 className="
                text-xl 
                font-bold 
                text-center"> Login </h1>
        <form onSubmit={handleSubmit(hdlSubmit)} >
          <div className="
                    flex flex-col
                    gap-2
                    py-4" >

            <RegisterInput register={register} name={"email"} errors={errors} />
            <RegisterInput register={register} name={"password"} type="password" errors={errors} />

          </div>
          <div className="flex justify-center">
            <Buttons isSubmitting={isSubmitting} label={"Login"} />

          </div>
        </form>
      </div>
    </div>
  )
}

export default Login