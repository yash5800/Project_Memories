import gsap from 'gsap'
import { ScrollTrigger, SplitText } from 'gsap/all'
import React, { useLayoutEffect, useRef } from 'react'
import Book from './Book';

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
          scrub: true
        },
      ease:'expo.out',
      stagger:0.2,
      delay:1
    })

    
    gsap.utils.toArray('.section').forEach((section) => {
      const sectionTween = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
          // markers: true,
        }
      })

      sectionTween.fromTo(section, {
        scale: 0.9,
        opacity: 0,
      }, {
        scale: 1,
        zIndex: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',

      });

      sectionTween.fromTo(section.querySelectorAll('.text'), {
        opacity: 0,
        y:50
      }, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.2
      });
    });

    
  },[])

  const test = [`Namaskaaram Priyamaina Paathakulaara..! 🙏🏻
         
          2022
          
          Appude oka 'mahammari' prabhanjananni thattuku nilabadi, enno parishkalni daati, entho aanandanga gadipina pasipraayanni vidichi vachham...

          Ee Ede maa tholi parichayam ee suvishala prapancha pravahamlo andaru kothhavalle , edo theliyani gubulu ,edo cheyyalanna thalampu, inkedo saadhidda manna pattudala ,  alaaa oka kothha adhyayam modalu pettam...`
          ,
          `Cheppedemundi, elaa gaithe andaru bayata anukuntaro ade jarigindi, elaa anni subjects lo top cheyyali ani sagam elaa anni subjects pass ithe chaalu ani mari sagam nischayinchukoni Modati adugu vesam...

      Enno kothha vishayalu, inkenno kothha parichayalu, marenno manchi maatalu ede ee edadi visheshaalu.

      Oka vyakthi, Rendu kothha bhaashalu , okati anni bhaashalaku thalli lanti bhaasha, inkoti annitilo kella sulabhamaina bhaasha (alaa ani valla nammakam, mammalni em anakandi) nerpinche kramamlo , andari priyatama upadhayudai thana prathibha paatavaalatho ,meppinchi, navvinchi,kavvinchi thanani ennadu maravakunda oka gatti punadi vesukunnaru maa hrudayalalo mariyu maa jeevithaalalo...`
        
]
  return (
    <div className='relative flex flex-col justify-center items-center  '>
       <div>
         <p className='luck max-sm:text-6xl max-lg:text-7xl text-8xl text-white code'>22 BATCH</p>
       </div>
     <Book />
      

    </div>
  )
}

export default Branch