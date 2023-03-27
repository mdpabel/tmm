import React, { useState } from 'react';
import Input, { Select, InputWrapper } from './Input';
import { Label } from '@/components/Input';

const options = [
  {
    label: 'Select County',
    value: '',
  },
  {
    label: 'Ventura County',
    value: 'Ventura County',
  },
  {
    label: 'Santa Barbara & L.A. County',
    value: 'Santa Barbara & L.A. County',
  },
];

const initialState = {
  county: '',
  price: '0',
  title: '',
};

const MIN = 0,
  MAX = 900;

const JobFiltering = () => {
  const [state, setState] = useState({ ...initialState });

  const { county, title, price } = state;

  console.log(price);

  return (
    <div className='px-2 space-y-4 md:px-5'>
      <div className='p-4 space-y-4 border'>
        <Label htmlFor='county'>Search Title</Label>
        <Input
          minLength={10}
          maxLength={100}
          placeholder='Service Title'
          onChange={(e) => setState({ ...state, title: e.target.value })}
          value={title}
          type='string'
        />
      </div>

      <div className='p-4 space-y-4 border'>
        <Label htmlFor='county'>Filter by county</Label>
        <Select
          options={options}
          onChange={(e) => {
            setState({ ...state, county: e });
          }}
        />
      </div>

      <div className='p-4 space-y-4 border'>
        <Label htmlFor='county'>
          <div className='flex justify-between w-full'>
            <span className='inline-block'>Filter by Price</span>
            <span className='inline-block text-xl font-bold'>{price}</span>
          </div>
        </Label>

        <div className='flex items-center justify-center m-auto'>
          <div className='relative min-w-full py-1'>
            <div className='relative h-2 bg-gray-200 rounded-full'>
              <input
                className='absolute w-full h-2 bg-teal-600 rounded-full'
                type='range'
                min={MIN}
                onChange={(e) => setState({ ...state, price: e.target.value })}
                max={MAX}
                value={price}
                step='1'
              />

              <div className='absolute bottom-0 left-0 -mb-6 -ml-1 text-gray-800'>
                {MIN}
              </div>
              <div className='absolute bottom-0 right-0 -mb-6 -mr-1 text-gray-800'>
                {MAX}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFiltering;
