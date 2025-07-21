import React from 'react'
import '../scroll.css' // Custom CSS for smooth animation

const Card = () => {
  return (
    <div className='reviewCard w-[300px] p-4 bg-gray-800 rounded-xl text-white mx-2'>
      <div className='flex justify-between items-center mb-2'>
        <div className='w-14 h-14 rounded-full overflow-hidden'>
          <img src='StartGroup.png' alt='pic' className='object-cover w-full h-full' />
        </div>
        <p className='text-sm text-gray-300'>Jan,10 2004</p>
      </div>
      <p className='text-md text-slate-300 mb-2'>
        In a world similar to the European Middle Ages, the feared yet revered Holy Knights...
      </p>
      <div className='text-right'>
        <p className='text-sm text-gray-500'>~ Basker</p>
      </div>
    </div>
  )
}

const Reviews = () => {
  return (
    <div className='flex flex-col py-5 gap-7'>
      <div className='w-full justify-start px-10'>
        <p className='text-graidentBlue text-2xl font-bold'>Teacher</p>
      </div>

      <div className='overflow-hidden w-full'>
        <div className='flex animate-scroll-x w-max'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

export default Reviews
