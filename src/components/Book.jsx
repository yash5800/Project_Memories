import React, { useEffect, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';

const Book = () => {

  return (
    <div className='overflow-hidden flex justify-center items-center p-5 gap-7 max-md:flex-col'>
      <div>
        <h1 className='text-3xl text-gray-400 font-bold mb-5'>Memories Book</h1>
        <p className='text-gray-500 max-w-lg max-lg:max-w-md'>
          This book contains the memories of our 22 batch. Each page represents a unique moment, from our first day to the last farewell. Flip through the pages to relive those unforgettable times!
        </p>
      </div>
      <HTMLFlipBook
        width={270}
        height={350}
        maxShadowOpacity={0.5}
        drawShadow={true}
        size="fixed"
      >
        {/* Page 1 */}
        <div className="flex flex-col justify-center items-center p-5 bg-gradient-to-br from-yellow-100 via-pink-200 to-purple-300">
          <p className="text-base text-gray-700">Page 1: Build & Deploy</p>
        </div>

        {/* Page 2 */}
        <div className="flex flex-col justify-center items-center p-5 bg-gradient-to-tr from-green-100 via-lime-200 to-emerald-300">
          <p className="text-base text-gray-700">Page 2: React Flipbook</p>
        </div>

        {/* Page 3 */}
        <div className="flex flex-col justify-center items-center p-5 bg-gradient-to-bl from-sky-100 via-blue-200 to-indigo-300">
          <p className="text-base text-gray-700">Page 3: Deployment Steps</p>
        </div>

        {/* Page 4 */}
        <div className="flex flex-col justify-center items-center p-5 bg-gradient-to-r from-pink-100 via-rose-200 to-red-300">
          <p className="text-base text-gray-700">Page 4: Hosting Options</p>
        </div>

        {/* Page 5 */}
        <div className="flex flex-col justify-center items-center p-5 bg-gradient-to-tl from-orange-100 via-amber-200 to-yellow-300">
          <p className="text-base text-gray-700">Page 5: GitHub Pages</p>
        </div>

        {/* Page 6 */}
        <div className="flex flex-col justify-center items-center p-5 bg-gradient-to-b from-purple-100 via-violet-200 to-fuchsia-300">
          <p className="text-base text-gray-700">Page 6: Final Thoughts</p>
        </div>
      </HTMLFlipBook>
    </div>
  );
};

export default Book;
