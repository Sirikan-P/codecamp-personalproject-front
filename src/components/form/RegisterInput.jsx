import React from 'react'

function RegisterInput({register ,name ,type="text" , errors,...rest}) {
  return (
    <div >
        <div className='flex justify-center'>            
            <input
                placeholder={name} //dynamic
                type={type}
                {...rest}
                {...register(name)}
                className=" border border-gray-400 
                            rounded-md
                            p-1 px-4 w-[250px]"/>
        </div>
        <div className='h-3 justify-center'>
        {
            errors[name] &&
            <p className="text-sm text-red-500"> {errors[name].message} </p>
        }
        </div>
    </div>
  )
}

export default RegisterInput