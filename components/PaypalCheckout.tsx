import React from 'react';
import { CardWrapper } from '@/components/Card';
import Button from './Button';
import LeftArrow from './icons/LeftArrow';

const PaypalCheckout = ({
  next,
  prev,
}: {
  next: () => void;
  prev: () => void;
}) => {
  return (
    <div className='min-w-[300px] md:min-w-[600px]'>
      <CardWrapper>
        <div>Under development</div>
        <Button onClick={() => prev()}>
          <LeftArrow /> Back
        </Button>
      </CardWrapper>
    </div>
  );
};

export default PaypalCheckout;
