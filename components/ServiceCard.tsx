import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Button from './Button';

interface ServiceCard {
  id: number;
  packageImage: string;
  name: string;
  price: number;
}

export const ServiceCard = ({ id, packageImage, name, price }: ServiceCard) => {
  return (
    <Link href={`/county-service/${id}`}>
      <div className='w-full bg-white border border-gray-200 rounded-lg shadow'>
        <Image
          width={300}
          height={300}
          className='p-8 m-auto rounded-t-lg'
          src={packageImage}
          alt='product image'
        />
        <div className='px-5 pb-5'>
          <h5 className='py-4 text-xl font-semibold tracking-tight text-gray-900'>
            {name}
          </h5>
          <div className='flex items-center justify-between'>
            <span className='text-3xl font-bold text-gray-900 '>${price}</span>
            <Button intent='primary' size='small' type='submit'>
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
