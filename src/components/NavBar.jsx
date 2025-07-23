import React from 'react'

const NavBar = () => {
  return (
    <nav className='fixed z-50 w-full flex justify-between items-center p-5 bg-transparent text-white'>
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