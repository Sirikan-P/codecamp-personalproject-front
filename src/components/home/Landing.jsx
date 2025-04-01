import React from 'react'

function Landing() {
  return (


        <div className='flex gap-20
                        h-[520px] p-24 py-20
                        bg-[url(/img/bg.jpg)] bg-no-repeat bg-cover' > 
        
            <div className='flex flex-col w-[800px] h-[360px] text-black p-8'>
                <div className='h-[260px] '>
                  <p className='italic text-6xl font-extrabold'>The easy way to find items</p>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti possimus ratione!</p>
                  </div> 
                <button className="btn btn-wide bg-yellow-600 border-0 ">BROWSE</button>
            </div>
            <div className='flex flex-col 
                            w-[600px] h-[360px] p-8
                            bg-white opacity-80 
                            rounded-lg '>
                <div className='flex flex-col h-[260px]  '>         
                  <p>START SELLING</p>
                  <p>YOU CAN SELL FROM EVERYWHERE...</p>
                  <p>READY TO START ?</p>
                </div>
                <button className="btn btn-wide bg-yellow-600 border-0 ">LEARN MORE</button>
                
            </div>
        </div>
       



  )
}

export default Landing