import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import React, { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText);

const Branch = () => {

  const quote = useRef();

  useLayoutEffect(()=>{
    const codeSplit = new SplitText('.code',{type:'chars, words'});
    const textSplit = new SplitText('.text',{type:'lines'})

    codeSplit.chars.forEach((char)=> char.classList.add('text-gold'))

    gsap.to('.code',{
      y:-40,
      duration:2,
      delay:1
    })

    gsap.from(codeSplit.chars,{
      yPercent:100,
      duration:1.0,
      ease:'expo.out',
      stagger:0.06
    })

    // gsap.to('.text',{
    //   y:-20,
    //   duration:2,
    //   delay:1
    // })

    gsap.from(textSplit.lines,{
      opacity:0,
      yPercent:100,
      duration:1.8,
      scrollTrigger:{
          trigger: quote.current,
          start:'top 70%',
          end:'top 40%',
          scrub: true,
          markers:true
        },
      ease:'expo.out',
      stagger:0.2,
      delay:1
    })


  },[])
  return (
    <div className='relative flex flex-col justify-center items-center p-3 gap-10 '>
       <div>
         <p className='luck max-sm:text-6xl max-lg:text-7xl text-8xl text-white code'>22 BATCH</p>
       </div>
       <div ref={quote} className='max-sm:w-[250px] max-lg:w-[400px] w-[500px]'>
          <p className='text-lg text-slate-400 alice text'>
            if you want multiple different components (like Profile, About, Footer, etc.) to each trigger their own scroll animations when entering the viewport, here’s how to do it cleanly in React + GSAP + ScrollTrigger.
          </p>
       </div>
    </div>
  )
}

export default Branch