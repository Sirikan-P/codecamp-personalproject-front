import React from 'react'

function FormInput({register ,name ,type="text" , errors , label,...rest}) {
    return (
        <div >
            <div className='flex justify-center  w-full'>
            <p className='w-[140px] text-left text-sm'> {label} </p>
            <input
                placeholder={name} //dynamic
                type={type}
                {...rest}
                {...register(name)}
                className="input input-bordered rounded-none bg-slate-100 w-4/6 p-1 px-4 h-10 text-base "
            />
            </div>
            <div>
            {
                errors[name] &&
                <p className="text-sm text-red-500 text-right pr-14"> {errors[name].message} </p>
            }
            </div>
        </div>
    )
}

export default FormInput