import React from 'react';
import { CardSkeleton } from './Skeletons';

const ServiceFallBack = () => {
  return (
    <div className='flex flex-wrap justify-center gap-5 pt-6'>
      {new Array(10).fill(0).map((_, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default ServiceFallBack;
