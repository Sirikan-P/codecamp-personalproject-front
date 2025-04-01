import { Loader } from 'lucide-react'
import React from 'react'


function Buttons({isSubmitting ,label }) {
  return (
    <button className="btn btn-wide bg-yellow-600 border-0 
                    hover:cursor-pointer" 
                    >
                        { isSubmitting 
                        ? <div className="
                                        flex
                                        gap-2"> 
                            <Loader className='animate-spin'/> 
                            <p> Loading... </p>
                            </div>
                        : <p>  {label} </p> 
                        }
                    </button>
  )
}

export default Buttons