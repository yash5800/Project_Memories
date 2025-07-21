import React from 'react'

const Card = ()=>{
  return (
    <div className='reviewCard gap-3'>
       <div className='w-full flex justify-between items-center flex-row'>
        <div className='w-14 h-14 rounded-full overflow-hidden '>
          <img src='StartGroup.png' rel='pic' className='object-cover w-full h-full ' />
        </div>
        <p className='text-sm text-gray-300'>Jan,10 2004</p>
       </div>
       <div className='w-full justify-center px-2 break-words' >
         <p className='text-md text-slate-300'>In a world similar to the European Middle Ages, the feared yet revered Holy Knights of Britannia use immensely powerful magic to protect the region of Britannia and its kingdoms.</p>
       </div>
       <div className='w-full text-end'>
         <p className='text-sm text-gray-500'>~ Basker</p>
       </div>
    </div>
  )
}

const Reviews = () => {
  return (
    <div className='flex  flex-col py-5 gap-7'>
      <div className='w-full justify-start px-10'>
       <p className='text-graidentBlue text-2xl font-bold'>Teacher</p>
      </div>
      <div className='flex flex-row gap-3 justify-start px-4 items-center overflow-x-scroll '>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
      </div>
    </div>
  )
}

export default Reviews