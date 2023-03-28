import AuthForm from '@/components/AuthForm';
import React, { ChangeEvent } from 'react';
import AppLayout from '@/layouts/AppLayout';
import Button from '@/components/Button';
import Link from 'next/link';

const RoleCard = ({
  header,
  subHeader,
  value,
}: {
  header: string;
  subHeader: string;
  value: string;
}) => {
  return (
    <li>
      <input
        type='radio'
        id={header}
        name='role'
        value={value}
        className='hidden peer'
        required
      />
      <label
        htmlFor={header}
        className='inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 '
      >
        <div className='block'>
          <div className='w-full text-lg font-medium'>{header}</div>
          <div className='w-full'>{subHeader}</div>
        </div>
        <svg
          aria-hidden='true'
          className='w-6 h-6 ml-3'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
            clipRule='evenodd'
          ></path>
        </svg>
      </label>
    </li>
  );
};

const SelectRole = ({
  setRole,
  role,
}: {
  setRole: React.Dispatch<React.SetStateAction<string>>;
  role: string;
}) => {
  return (
    <div
      onChange={(e: ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
      className='px-10 space-y-8 bg-white rounded-lg shadow md:space-y-12 py-14'
    >
      <ul className='grid w-full gap-6 md:grid-cols-2'>
        <RoleCard
          header="I'm a client"
          subHeader='Looking for moving movers service'
          value='client'
        />
        <RoleCard
          header="I'm a employee"
          subHeader='Looking for work'
          value='employee'
        />
        <RoleCard
          header="I'm a company owner"
          subHeader='Looking for selling services'
          value='company'
        />
      </ul>
      <div className='flex flex-col items-center justify-between space-y-4 '>
        <Button type='submit'>Join as a {role ? role : 'client'}</Button>
        <div className='text-sm md:text-lg'>
          <span>
            Already have an account?
            <Link className='font-medium text-blue-600' href='/login'>
              {' '}
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
