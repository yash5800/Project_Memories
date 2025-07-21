import React, { useLayoutEffect } from 'react'
import gsap from 'gsap'

const StartGroup = () => {
  const tl = gsap.timeline()

  useLayoutEffect(()=>{

    tl.fromTo('#filter',{
      opacity:0
    },
    {
      opacity:1,
      delay:1
    }
    )
    tl.fromTo('.text-line',{
      opacity:0,
      y:20
    },{
      opacity:1,
      y:0,
      delay:1,
      stagger:0.3
    }
  )
  },[])
  return (
   <div className='relative max-lg:h-[285px] h-[450px] w-full'>
      <img 
        src='StartGroup.jpg'
        alt='Start Group'
        className='h-full object-cover w-full'
      />
      <div 
      id='filter'
      className='absolute bg-black/60 inset-0 flex justify-start items-center'>
      </div>
   </div>
  )
}

export default StartGroup