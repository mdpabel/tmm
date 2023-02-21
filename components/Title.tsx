import React, { ReactNode } from 'react';

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className='pt-5 text-xl font-medium text-center text-gray-700'>
      {children}
    </h2>
  );
};

export default Title;
