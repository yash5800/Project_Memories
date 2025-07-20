import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger);

  // {
  //   name:'A.Yaswanth Kiran',
  //   rollno:'22481A0510',
  //   insta:'',
  //   linkedin:'',
  //   profileUrl:''
  // }

const Card = ({name,rollno,insta,linkedin,profileUrl})=>{
  return(
    <div className='cardp justify-center items-center flex flex-col'>
      <img src={profileUrl?profileUrl:"StartGroup.png"} alt="profile" className='w-30 h-30 rounded-full object-cover' />
       <div className='p-3 text-center'>
        <p className='text-lg text-gray-400 caveat'>{name}</p>
        <p className='text-base text-slate-500 font-thin'>{rollno}</p>
       </div>
       <div className='flex flex-row gap-6'>
         {insta && <a href={insta} target='_blank'>
           <img src='icons/insta.svg' alt="Instagrame" className='w-6 h-6 hover:scale-130' />
         </a>}
         {linkedin && <a href={linkedin} target='_blank'>
           <img src='icons/linkedin.svg' alt="LinkedIn" className='w-6 h-6 hover:scale-130' />
         </a>}
       </div>
    </div>
  )
}

const Profiles = () => {

  const profiles = useRef()
  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}profiles.json`)
      .then(res => res.json())
      .then(data => setProfileDetails(data));
  }, []);

  useLayoutEffect(()=>{
    gsap.fromTo(profiles.current,
      {
        opacity:0,
        yoyo:true,
        y:50
      },
      {
      opacity:1,
      duration:1.8,
      y:0,
      scrollTrigger:{
          trigger: profiles.current,
          start:'top bottom',
          end:'top 40%',
          scrub: true,
          markers:true
        },
      ease:'expo.inOut',
    })
  },[])

  return (
    <div className='p-5' ref={profiles}>
      <h1 className='text-3xl text-graident 
      text-center
      font-bold'>Friends</h1>
      <div className='flex justify-center items-center p-5 flex-wrap gap-5'  >
        {
          profileDetails &&
          profileDetails.map((student,index)=>(
            <Card key={`${index}-${student.rollno}`} name={student.name} rollno={student.rollno} insta={student.insta} linkedin={student.linkedin} profileUrl={student.profileUrl} />
          ))
        }
      </div>
    </div>
  )
}

export default Profiles