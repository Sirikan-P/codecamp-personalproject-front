import React from 'react'

function FileInput({register ,name ,type="file", errors , label,...rest}) {
    return (
        <div>
            <div className='flex justify-center w-full'>
                <p className='w-[80px]  text-left text-sm'> {label} </p>
                <input type= {type}
                    name={name}                
                    id={name}
                    {...register(name)} 
                    {...rest}  
                    multiple                 
                     />
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

export default FileInput