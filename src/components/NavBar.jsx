import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

const NavBar = () => {
  useGSAP(()=>{
     const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: 'nav',
        start: 'bottom top'
      }
     })

     navTween.fromTo('nav', {
      backgroundColor: 'transparent',
     },
     {
      backgroundColor : '#00000050',
      backgroundFilter: 'blur(10px)',
      duration: 1.5,
      ease: 'power1.inOut'
     })
  },[])
  return (
    <nav className='fixed z-50 w-full flex justify-between items-center p-5 text-white'>
      <div>
        <h1 className='text-base font-bold text-blue-400'>Memories</h1>
      </div>
      <div className='flex justify-center items-center gap-5'>
        <a href="#book" className='text-md font-medium'>Book</a>
        <a href="#projects" className='text-md font-medium'>Projects</a>
        {/* <a href="" className='text-md font-medium'>Opinions</a> */}
      </div>
    </nav>
  )
}

export default NavBar