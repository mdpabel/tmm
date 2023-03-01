
import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import HamburgerIcon from '@/components/icons/hamburgerIcon';
import CrossIcon from '@/components/icons/CrossIcon';
import logo from '@/assets/images/tmmlogo.png';
import { useSession, getSession } from 'next-auth/react';
import { Session, User } from 'next-auth';

const NavLink = ({
  label,
  link,
  customStyles,
  onClick,
}: {
  label: string;
  link: string;
  customStyles?: 'login' | 'register' | 'normal';
  onClick?: () => void;
}) => {
  return (
    <Link
      onClick={onClick}
      href={link === '/' ? link : '/' + link}
      className={clsx({
        'px-4 py-2 mb-3 md:ml-3 font-medium rounded text-gray-900 flex md:justify-center items-center transition duration-150 ease-in-out my-2':
          true,
        'bg-custom text-orange-100 justify-center': customStyles === 'register',
        'bg-gray-100 justify-center': customStyles === 'login',
      })}
    >
      {label}
    </Link>
  );
};

export interface CustomSession extends Session {
  user?: User & { role?: string; firstName?: string; lastName?: string };
}
const Navbar = () => {
  const { data, status } = useSession();
  const [show, setShow] = useState(false);

  const role = (data as CustomSession)?.user?.role;

  return (
    <>
      <div className='w-full h-full bg-gray-200'>
        <nav className='hidden bg-white shadow xl:block'>
          <div className='container px-6 py-2 mx-auto xl:py-0'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center justify-end w-full sm:w-auto sm:items-stretch sm:justify-start'>
                <Link href='/'>
                  <Image width={100} src={logo} alt='tmmlogo' />
                </Link>
              </div>
              <div className='flex'>
                <div className='hidden xl:flex '>
                  <NavLink label='Home' link='/' />
                  <NavLink label='County Service' link='county-service' />
                  {((role && role === 'MOVER') ||
                    role === 'MOVING_COMPANY') && (
                    <NavLink label='Find Jobs' link='jobs' />
                  )}
                  <NavLink label='About Us' link='about' />
                  <NavLink label='Contact Us' link='contact' />
                  {status === 'unauthenticated' && (
                    <>
                      <NavLink
                        onClick={() => setShow(!show)}
                        label='Login'
                        link='login'
                        customStyles='login'
                      />
                      <NavLink
                        onClick={() => setShow(!show)}
                        label='Register'
                        link='register'
                        customStyles='register'
                      />
                    </>
                  )}
                  {status === 'authenticated' && (
                    <NavLink
                      onClick={() => setShow(!show)}
                      label='Dashboard'
                      link='dashboard'
                      customStyles='register'
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav>
          <div className='fixed top-0 z-40 flex items-center justify-between w-full px-6 py-4 bg-white xl:hidden'>
            <div className='w-24'>
              <Link href='/'>
                <Image width={100} src={logo} alt='tmmlogo' />
              </Link>
            </div>
            <div className='flex items-center'>
              <div
                id='menu'
                className='text-gray-800'
                onClick={() => setShow(!show)}
              >
                {show ? '' : <HamburgerIcon />}
              </div>
            </div>
          </div>
          <div
            className={
              show
                ? 'w-full xl:hidden h-full absolute z-40  transform  translate-x-0 '
                : '   w-full xl:hidden h-full absolute z-40  transform -translate-x-full'
            }
          >
            <div
              className='w-full h-full bg-gray-800 opacity-50'
              onClick={() => setShow(!show)}
            />
            <div className='fixed top-0 z-40 flex-col justify-between w-64 h-full pb-4 overflow-y-auto transition duration-150 ease-in-out bg-white shadow xl:hidden'>
              <div className='h-full px-6'>
                <div className='flex flex-col justify-between w-full h-full'>
                  <div>
                    <div className='flex items-center justify-between w-full mt-6'>
                      <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center'>
                          <Link onClick={() => setShow(!show)} href='/'>
                            <Image width={100} src={logo} alt='tmmlogo' />
                          </Link>
                        </div>
                        <div
                          id='cross'
                          className='text-gray-800'
                          onClick={() => setShow(!show)}
                        >
                          <CrossIcon />
                        </div>
                      </div>
                    </div>
                    <ul className='flex flex-col justify-between mt-10 f-m-m'>
                      <div className='justify-items-end'>
                        <NavLink
                          onClick={() => setShow(!show)}
                          label='Home'
                          link='/'
                        />
                        {((role && role === 'MOVER') ||
                          role === 'MOVING_COMPANY') && (
                          <NavLink
                            onClick={() => setShow(!show)}
                            label='Find Jobs'
                            link='jobs'
                          />
                        )}

                        <NavLink
                          onClick={() => setShow(!show)}
                          label='County Service'
                          link='county-service'
                        />
                        <NavLink
                          onClick={() => setShow(!show)}
                          label='About Us'
                          link='about'
                        />
                        <NavLink
                          onClick={() => setShow(!show)}
                          label='Contact Us'
                          link='contact'
                        />
                        {status === 'unauthenticated' && (
                          <>
                            <NavLink
                              onClick={() => setShow(!show)}
                              label='Login'
                              link='login'
                              customStyles='login'
                            />
                            <NavLink
                              onClick={() => setShow(!show)}
                              label='Register'
                              link='register'
                              customStyles='register'
                            />
                          </>
                        )}
                        {status === 'authenticated' && (
                          <NavLink
                            onClick={() => setShow(!show)}
                            label='Dashboard'
                            link='dashboard'
                            customStyles='register'
                          />
                        )}
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
