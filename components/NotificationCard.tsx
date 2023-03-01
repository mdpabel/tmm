import React from 'react';
import NotificationIcon from './icons/NotificationIcon';

const NotificationCard = () => {
  return (
    <div className='flex items-center justify-center w-full h-full px-4 py-12'>
      <div className='max-w-xs px-4 py-6 bg-white rounded shadow sm:max-w-sm sm:px-8'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-4xl font-semibold leading-9 text-gray-800 '>
              16
            </p>
            <p className='mt-1 text-xs font-semibold leading-3 text-gray-500 '>
              Unread
            </p>
          </div>
          <div className='flex items-center justify-center w-10 h-10 ml-48 rounded-full sm:ml-56'>
            <NotificationIcon />
          </div>
        </div>
        <div className='pb-3 mt-6 border-b border-gray-200'>
          <p className='text-xs font-semibold leading-3 text-gray-800 '>
            Design mobile UI dashboard
          </p>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-xs leading-3 text-gray-500 '>
              How to write advertising article
            </p>
            <p className='text-xs font-semibold leading-3 text-right text-gray-500 '>
              3 hrs ago
            </p>
          </div>
        </div>
        <div className='pb-3 mt-3 border-b border-gray-200'>
          <p className='text-xs font-semibold leading-3 text-gray-800'>
            Design mobile UI dashboard
          </p>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-xs leading-3 text-gray-500 '>
              How to write advertising article
            </p>
            <p className='text-xs font-semibold leading-3 text-right text-gray-500 '>
              3 hrs ago
            </p>
          </div>
        </div>
        <div className='pb-3 mt-3 border-b border-gray-200'>
          <p className='text-xs font-semibold leading-3 text-gray-800 '>
            Design mobile UI dashboard
          </p>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-xs leading-3 text-gray-500 '>
              How to write advertising article
            </p>
            <p className='text-xs font-semibold leading-3 text-right text-gray-500 '>
              3 hrs ago
            </p>
          </div>
        </div>
        <div className='pb-3 mt-3 border-b border-gray-200'>
          <p className='text-xs font-semibold leading-3 text-gray-800 '>
            Design mobile UI dashboard
          </p>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-xs leading-3 text-gray-500 '>
              How to write advertising article
            </p>
            <p className='text-xs font-semibold leading-3 text-right text-gray-500 '>
              3 hrs ago
            </p>
          </div>
        </div>
        <p className='mt-4 text-xs font-semibold leading-none text-indigo-700'>
          +12 more
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
