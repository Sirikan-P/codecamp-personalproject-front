import React from 'react'
import useAuthStore from '../../store/auth-store'

import { createAlert } from "../../utils/createAlert"
import { useForm } from "react-hook-form"

//validator
import { profileSchema } from "../../utils/validators"
import { zodResolver } from "@hookform/resolvers/zod"

//form component
import FormInput from '../../components/form/FormInput'
import FileInput from '../../components/form/FileInput'
import Buttons from '../../components/form/Buttons'
import Avatar from '../../components/user/Avatar'



function MyProfile() {
  //JS

  //zustand : global state
  const user = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.token)
  //console.log(token)
  const actionUpdateProfileWithZustand = useAuthStore( (state) => state.actionUpdateProfileWithZustand)
  //react hook form
  const { register, handleSubmit, formState, reset, setValue } = useForm({
    //use zod validate
    resolver:zodResolver(profileSchema)
  })
  const { isSubmitting, errors } = formState

  //----------------------------------------
  const hdlSubmit = async(value)=>{
    
      const newData = {...value}
      console.log(newData)
      
      const formeData = new FormData()

      Object.keys(newData).forEach(key =>{
        console.log(key, newData[key])
        if(key === "profileImage"){
          formeData.append(key, newData[key][0])
        } else {

          formeData.append(key, newData[key])
        }
      })
      console.log(token)
      console.log("fromedata",Object.entries(FormData))
      const res = await actionUpdateProfileWithZustand(formeData,token,user.id)
      console.log(res)
      if(res.success){
        createAlert("success", "save profile success")
      }else{
        createAlert("info","something wrong")
      }
  }

  //----------------------------------------
  return (

    <div className='flex flex-col justify-center items-center'>

      <div className='flex flex-col justify-center items-center'>
        <div> < Avatar className='w-24 h-24 rounded-full ' 
                                    menu = {false}
                                    imgSrc = {user.profileImage}/>
        </div>
        <p className=' text-center font-medium py-4'>MyProfile</p>       
      </div>
      <div className='flex flex-col justify-center
        w-full h-[520px]         
        m-auto py-2' >
        <div className="w-[600px] border p-4 m-auto
            rounded-md  bg-white opacity-90">
          <form onSubmit ={ handleSubmit(hdlSubmit) } >
          <FileInput   register={register} name={"profileImage"}  errors={errors} label="profile image" />              
            <div className="flex flex-col gap-2 py-2">
                            

              <FormInput register={register} name={"firstname"} defaultValue={user.firstname || ""} errors={errors} label="firstname :" /> 
              <FormInput register={register} name={ "lastname"} defaultValue={user.lastname || ""} errors={errors} label="lastname : " />
              <FormInput register={register} name={ "phoneNumber"} defaultValue={user.phoneNumber || ""} errors={errors} label="phone : " />
             
              <FormInput register={register} name={ "shopName"}  defaultValue={user.shopName || ""} errors={errors} label="shop name" />
              <FormInput register={register} name={ "idcardNumber"} defaultValue={user.idcardNumber || "" } errors={errors} label="ID card Number" />
              <FormInput register={register} name={ "address"} defaultValue={user.address || ""}  errors={errors} label="address" />
            </div>
            <div className="flex justify-center">
              <Buttons isSubmitting={ isSubmitting } label={ "SAVE"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MyProfile