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

const Card = ({name,rollno,insta,linkedin,profileUrl,handleClick})=>{
  const [active,setActive] = useState(false);
  return(
    <div className='cardp justify-center items-center flex flex-col main overflow-hidden' 
    >
      <div onClick={()=>setActive(!active)} className='w-[25px] h-[25px] top-3 absolute backdrop-blur-[3px] rounded-full p-1 right-3 hover:cursor-pointer z-10'>
        <img src='icons/info.png' className='w-full h-full object-cover' />
      </div>
      <img 
        src={profileUrl?`profiles/${profileUrl}`:"StartGroup.png"} 
        alt="profile" 
        className='w-full h-full rounded-[12px] object-cover pro'
      />
      <div className={`filter rounded-[12px]  ${active?'backdrop-blur-[1px] z-1':'z-0'}`}
       onClick={()=>handleClick(profileUrl?`profiles/${profileUrl}`:"StartGroup.png")}
      ></div>
      <div className='absolute bottom-3 p-3 left-3 '>
         <p className='text-white font-medium capitalize text-base'>{name.toLowerCase()}</p>
      </div>
      <div className={`${active? 'block z-10':'hidden'} p-3 max-w-[170px] absolute bg-white rounded-xl text-center flex flex-col gap-2 `}>
        <div className='flex flex-col items-start'>
         <p className='text-[12px] text-thin libre'>Roll No :</p>
         <p className='text-base font-medium capitalize libre text-black'>{rollno}</p>
        </div>
         <div className='flex flex-row justify-center gap-6'>
           {insta && <a href={insta} target='_blank'>
             <div className='shadow-md shadow-black rounded-full w-7 h-7 overflow-hidden border-2 border-white hover:scale-125'>
              <img src='icons/insta.svg' alt="Instagrame"  className='scale-115 w-full h-full object-cover' />
             </div>
           </a>}
           {linkedin && <a href={linkedin} target='_blank'>
             <div className='shadow-md shadow-black rounded-full w-7 h-7 overflow-hidden border-2 border-white hover:scale-125'>
              <img src='icons/linkedin.svg' alt="LinkedIn"  className='scale-115 w-full h-full object-cover' />
             </div>
           </a>}
         </div>
      </div>
       {/* <div className='p-3 text-center'>
        <p className='text-lg text-gray-400 caveat'>{name}</p>
        <p className='text-base text-slate-500 font-thin'>{rollno}</p>
       </div> */}
    </div>
  )
}

const Profiles = () => {
  const [view,setView] = useState('');
  const point = useRef();

  const profiles = useRef()
  const [profileDetails, setProfileDetails] = useState(null);

  const handleClick = (url)=>{
    console.log(url)
    setView(url)
  }

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}profilesDetails.json`)
      .then(res => res.json())
      .then(data => setProfileDetails(data));

    let handler = (e)=>{
      if(point.current && !point.current.contains(e.target)){
        setView('');
        console.log(point.current)
      }
    }

    document.addEventListener("mousedown",handler);

    return()=>{
      document.removeEventListener("mousedown",handler)
    }
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
        },
      ease:'expo.inOut',
    })
  },[])

  return (
    <>
    <div className='p-5 z-0' ref={profiles}>
      <h1 className='text-3xl text-graident 
      text-center
      font-bold'>Friends</h1>
      <div className='flex justify-center items-center p-5 flex-wrap gap-5'  >
        {
          profileDetails &&
          profileDetails.map((student,index)=>(
            <Card key={`${index}-${student.rollno}`} name={student.name} rollno={student.rollno} insta={student.insta} linkedin={student.linkedin} profileUrl={student.profileUrl} handleClick={handleClick} />
          ))
        }
      </div>
    </div>
    
    {view && <div className='h-full w-screen fixed top-0 flex justify-center items-center backdrop-blur-xl'>
        <div ref={point} className='scale-80 min-lg:scale-50 max-md:scale-75 bg-yellow-200 z-10'>
           <img src={view} alt="View" />
        </div>
    </div>}
    </>
  )
}

export default Profiles