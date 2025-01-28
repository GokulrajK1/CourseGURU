import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Menu = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-black'>
      <h1 className='w-full text-3xl font-bold'>
        <span className='text-black'>CourseGU</span>
        <span className='text-red-500'>RU</span>
      </h1>
      <div className='relative'>
        <div className='z-50' onClick={handleNav}>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        {nav && (
          <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md'>
            <ul className='uppercase text-black'>
              <li className='py-2 px-4 hover:bg-gray-100 border-b border-gray-200'>
                Account
              </li>
              <li className='py-2 px-4 hover:bg-gray-100 border-b border-gray-200'>
                Saved Schedules
              </li>
              <li className='py-2 px-4 hover:bg-gray-100'>Subscription</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
