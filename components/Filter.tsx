'use client';

import React, { useState } from 'react';
import SearchIcon from './icons/SearchIcon';

const Filter = ({ label = 'Services Inventory' }: { label?: string }) => {
  const [inputVal, setInputVal] = useState('');
  const [county, setCounty] = useState('');

  return (
    <div className='w-full px-4 py-4 md:px-10 md:py-7'>
      <div className='items-center justify-between lg:flex'>
        <p className='text-base font-bold leading-normal text-center text-gray-800 sm:text-lg md:text-xl lg:text-2xl'>
          {label}
        </p>
        <div className='items-center mt-6 md:flex lg:mt-0'>
          <div className='flex items-center'>
            <div className='flex items-center w-full pl-3 bg-white border border-gray-200 rounded md:w-64'>
              <SearchIcon />
              <input
                onChange={(e) => setInputVal(e.target.value)}
                value={inputVal}
                type='text'
                className='py-2.5 pl-1 w-full focus:outline-none text-sm rounded text-gray-600 placeholder-gray-500'
                placeholder='Search'
              />
            </div>
          </div>
          <div className='flex items-center mt-4 md:mt-0 md:ml-3 lg:ml-0'>
            <div className='w-full px-3 py-2 bg-white border border-gray-200 rounded md:w-40 lg:ml-3'>
              <select className='w-full text-sm leading-3 text-gray-500 focus:outline-none'>
                <option>Select county</option>
                <option>Ventura County</option>
                <option>Santa Barbara & L.A. County</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
