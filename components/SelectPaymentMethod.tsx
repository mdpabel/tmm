import React, { useEffect, useState } from 'react';
import { CardWrapper } from '@/components/Card';
import CardIcon from './icons/CardIcon';
import RightArrow from './icons/RightArrow';
import paypalImg from '@/assets/images/paypal.png';
import Image from 'next/image';
import Button from './Button';
import LeftArrow from './icons/LeftArrow';

const SelectPaymentMethod = ({
  prev,
  next,
}: {
  next: () => void;
  prev: () => void;
}) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    if (paymentMethod) {
      window.localStorage.setItem('paymentMethod', paymentMethod);
    }
  }, [paymentMethod]);

  return (
    <div
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setPaymentMethod(e.target.value)
      }
      className='w-[350px] md:w-[700px] space-y-4'
    >
      <li className='list-none'>
        <input
          type='radio'
          id='card'
          name='hosting'
          value='card'
          className='hidden peer'
          required
        />
        <label
          htmlFor='card'
          className='flex justify-between w-full px-4 py-4 bg-white border rounded shadow-md cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 peer-checked:font-medium'
        >
          <div className='flex gap-4'>
            <CardIcon /> Card
          </div>
          <div>
            <RightArrow />
          </div>
        </label>
      </li>

      <li className='list-none'>
        <input
          type='radio'
          id='paypal'
          name='hosting'
          value='paypal'
          className='hidden peer'
          required
        />
        <label
          htmlFor='paypal'
          className='flex justify-between w-full px-4 py-4 bg-white border rounded shadow-md cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 peer-checked:font-medium'
        >
          <div className='flex gap-4'>
            <Image src={paypalImg} alt='paypal-icon' width='24' height='24' />{' '}
            Paypal
          </div>
          <div>
            <RightArrow />
          </div>
        </label>
      </li>

      <div className='flex justify-between'>
        <Button onClick={() => prev()}>
          <LeftArrow />
          Back
        </Button>
        <Button
          disabled={paymentMethod === ''}
          onClick={() => next()}
          type='submit'
        >
          Payment Form <RightArrow />
        </Button>
      </div>
    </div>
  );
};

export default SelectPaymentMethod;
