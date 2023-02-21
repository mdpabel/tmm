import React from 'react';
import { BarSkeleton } from '@/components/Skeletons';

const JobListingLoader = () => {
  return (
    <div className='flex flex-col justify-between w-full max-w-4xl gap-4 px-5 py-4 bg-white rounded-md shadow-xl shadow-gray-100 sm:flex-row sm:items-center'>
      <span className='text-sm '>
        <BarSkeleton />
      </span>
      <h3 className='mt-px font-bold'>
        <BarSkeleton />
      </h3>
      <div className='flex items-center gap-3 mt-2'>
        <h3 className='mt-px font-bold'>
          <BarSkeleton />
        </h3>
        <h3 className='mt-px font-bold'>
          <BarSkeleton />
        </h3>
      </div>
    </div>
  );
};

export default JobListingLoader;
