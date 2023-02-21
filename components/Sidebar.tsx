import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/tmmlogo.png';
import Link from 'next/link';
import Button from './Button';
import { signOut, useSession } from 'next-auth/react';
import { Session, User } from 'next-auth';

const sidebarLinks = [
  {
    label: 'Dashboard',
    link: 'dashboard',
    allowed: ['MOVER', 'MOVING_CUSTOMER', 'MOVING_COMPANY'],
  },
  {
    label: 'Scheduled',
    link: 'scheduled',
    allowed: ['MOVER', 'MOVING_COMPANY'],
  },
  {
    label: 'Orders',
    allowed: ['MOVING_COMPANY'],
    subItems: [
      {
        label: 'Add order',
        link: 'add-order',
        allowed: ['MOVING_COMPANY'],
      },
      {
        label: 'Order history',
        link: 'order-history',
        allowed: ['MOVING_COMPANY'],
      },
      {
        label: 'Order request',
        link: 'order-request',
        allowed: ['MOVING_COMPANY'],
      },
    ],
  },
  {
    label: 'Jobs',
    allowed: ['MOVING_COMPANY'],
    subItems: [
      {
        label: 'Create job',
        link: 'create-job',
        allowed: ['MOVING_COMPANY'],
      },
      {
        label: 'Manage Jobs',
        link: 'manage-jobs',
        allowed: ['MOVING_COMPANY'],
      },
      {
        label: 'Job Request',
        link: 'job-request',
        allowed: ['MOVING_COMPANY'],
      },
    ],
  },
  {
    label: 'Services',
    allowed: ['MOVING_COMPANY'],
    subItems: [
      {
        label: 'Add Service',
        link: 'add-service',
        allowed: ['MOVING_COMPANY'],
      },
      {
        label: 'Services Inventory',
        link: 'services-inventory',
        allowed: ['MOVING_COMPANY'],
      },
    ],
  },

  {
    label: 'users',
    allowed: ['ADMIN'],
    subItems: [
      {
        label: 'Add new user',
        link: 'add-new-user',
        allowed: ['ADMIN'],
      },
      {
        label: 'Manage Users',
        link: 'manage-users',
        allowed: ['ADMIN'],
      },
    ],
  },
  {
    label: 'My orders',
    link: 'my-orders',
    allowed: ['MOVING_CUSTOMER'],
  },
  {
    label: 'My Jobs',
    link: 'my-job',
    allowed: ['MOVER'],
  },
  {
    label: 'Job Tracking',
    link: 'job-tracking',
    allowed: ['MOVER'],
  },
];

interface SubItemsType {
  label: string;
  link: string;
}

interface SidebarItemType {
  list: number | null;
  setList?: Dispatch<SetStateAction<null | number>>;
  index: number;
  label: string;
  subItems?: SubItemsType[];
  setToggleSidebar?: Dispatch<SetStateAction<boolean>>;
  toggleSidebar?: boolean;
  link?: string;
}

interface CustomSession extends Session {
  user?: User & { role?: string; firstName?: string; lastName?: string };
}

const SidebarItem = ({
  list,
  setList,
  index,
  label,
  link,
  setToggleSidebar,
  toggleSidebar,
  subItems,
}: SidebarItemType) => {
  return (
    <div className={'pt-4'}>
      <div
        onClick={() => (list === index ? setList!(null) : setList!(index))}
        className='flex justify-between w-full pb-3 border-b-2 border-gray-200 cursor-pointer'
      >
        {link ? (
          <Link
            href={link}
            className='text-sm leading-tight tracking-tight text-gray-800 capitalize select-none xl:text-lg '
          >
            {label}
          </Link>
        ) : (
          <p className='text-sm leading-tight tracking-tight text-gray-800 capitalize select-none xl:text-lg '>
            {label}
          </p>
        )}
        {!link && (
          <button className='focus:outline-none'>
            <svg
              className={list === index ? 'hidden' : 'text-gray-800 '}
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
            >
              <path
                d='M15 7.5L10 12.5L5 7.5'
                stroke='currentColor'
                strokeWidth='1.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <svg
              className={list === index ? 'text-gray-800' : 'hidden'}
              xmlns='http://www.w3.org/2000/svg'
              width={20}
              height={20}
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <polyline points='6 15 12 9 18 15' />
            </svg>
          </button>
        )}
      </div>

      {!link && (
        <div className={list === index ? 'pl-2 block' : 'hidden'}>
          <div className='flex flex-col'>
            {subItems?.map(({ label, link }) => (
              <div key={label}>
                <div className='h-6' />
                <div className='flex items-stretch justify-between'>
                  <Link
                    onClick={() =>
                      setToggleSidebar && setToggleSidebar(!toggleSidebar)
                    }
                    href={link}
                    className={
                      'text-left focus:outline-none pl-3 border-l-4 border-gray-800 focus:border-brand  text-gray-800 focus:text-brand  hover:text-brand hover:border-brand flex w-full text-sm xl:text-lg leading-tight tracking-tight capitalize'
                    }
                  >
                    {label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

function Sidebar() {
  const [list, setList] = useState<number | null>(null);
  const [role, setRole] = useState('');
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const { data, status } = useSession();

  useEffect(() => {
    setRole((data as CustomSession)?.user?.role ?? '');
  }, [data, status]);

  console.log(data);

  return (
    <nav>
      <div
        className={
          (toggleSidebar ? 'sidebar ' : ' ') +
          'overflow-y-scroll fixed left-0 h-79vh h-full w-80 xl:w-64 xl:mr-6 2xl:pr-12 2xl:mr-12 pr-6 border-r-2 border-gray-200  bg-white px-6 xl:pl-0 z-20 top-0 pt-10 transition-transform duration-150 ease-in-out xl:hidden'
        }
      >
        <div>
          <div className='flex items-center justify-between'>
            <Link
              onClick={() => setToggleSidebar(!toggleSidebar)}
              href='/dashboard'
            >
              <Image src={logo} alt='tmm logo' />
            </Link>
            <div
              onClick={() => setToggleSidebar(true)}
              className='pt-8 text-gray-800 '
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-x'
                width={24}
                height={24}
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
          </div>
          <div>
            {sidebarLinks.map(({ label, link, subItems, allowed }, index) => {
              return (
                allowed.includes(role) && (
                  <SidebarItem
                    link={link}
                    setToggleSidebar={(val) => setToggleSidebar(val)}
                    subItems={subItems}
                    list={list}
                    setList={setList}
                    label={label}
                    key={label}
                    index={index}
                  />
                )
              );
            })}
          </div>

          <div className='absolute bottom-10'>
            <Button
              onClick={() =>
                signOut({
                  callbackUrl: '/',
                })
              }
              intent='logout'
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div
        onClick={() => setToggleSidebar(false)}
        className='fixed top-0 left-0 z-50 flex items-center justify-center w-8 h-8 mt-10 bg-gray-800 rounded-r-lg text-gray-50 xl:hidden'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='icon icon-tabler icon-tabler-chevron-right'
          width={44}
          height={44}
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          fill='none'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <polyline points='9 6 15 12 9 18' />
        </svg>
      </div>

      <div className='hidden xl:block'>
        <div className='px-12 mr-12 d-sidebar w-80 xl:w-64 2xl:w-96' />
        <div
          className={
            'd-sidebar  fixed overflow-y-auto h-79vh h-full w-80 xl:w-64 2xl:w-96 xl:mr-6 2xl:pr-12 2xl:mr-12 pr-6 border-r-2 border-gray-200  bg-white px-6 xl:pl-12 z-0 top-0 pt-10 transition-transform duration-150 ease-in-out'
          }
        >
          <div>
            <Link href='/'>
              <Image src={logo} alt='tmm logo' />
            </Link>
            <div className='pt-8'>
              {sidebarLinks.map(({ label, link, subItems, allowed }, index) => {
                return (
                  allowed.includes(role) && (
                    <SidebarItem
                      link={link}
                      subItems={subItems}
                      list={list}
                      setList={setList}
                      label={label}
                      key={label}
                      index={index}
                    />
                  )
                );
              })}
            </div>
          </div>

          <div className='absolute bottom-10'>
            <Button
              onClick={() =>
                signOut({
                  callbackUrl: '/',
                })
              }
              intent='logout'
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
