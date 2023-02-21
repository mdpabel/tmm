import React, { ReactNode } from 'react';

type ChildrenProps = {
  children: ReactNode;
};

const CardHeader = ({ children }: ChildrenProps) => {
  return <div className='pb-2 text-center md:pb-8'>{children}</div>;
};

const CardWrapper = ({ children }: ChildrenProps) => {
  return (
    <div className='relative px-10 py-8 bg-white border rounded shadow md:m-8 md:py-16'>
      {children}
    </div>
  );
};

const CardBody = ({ children }: ChildrenProps) => {
  return <div>{children}</div>;
};

export { CardWrapper, CardHeader, CardBody };
