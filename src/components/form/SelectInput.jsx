import React from 'react'

function SelectInput({register , name , errors , label, ar , ...rest }) {
    return (
        <div>
            <div className='flex justify-center w-full'>
                <p className='w-[140px] text-left text-sm'> {label} </p>
                
                <select {...register(name)} {...rest} 
                    className='elect select-bordered rounded-none bg-slate-100 w-4/6 p-1 px-4 h-10 text-base  '>
                    {ar.map((quality) => (
                    <option key={quality} value={quality}> 
                        {quality}
                    </option>
                    ))}
                </select>





            </div>
            <div>
                {
                    errors?.[name] &&
                    <p className="text-sm text-red-500 text-right pr-14"> {errors[name].message} </p>
                }
            </div>


        </div>
    )
}

export default SelectInput