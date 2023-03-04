import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { CardWrapper } from '@/components/Card';
import Input, {
  TextArea,
  Select,
  Label,
  InputWrapper,
} from '@/components/Input';
import Button from '@/components/Button';
import Title from '@/components/Title';
import { useAsync } from '@/hooks/useAsync';
import Spinner from '@/components/Spinner';
import Alert from '@/components/Alert';
import Image from 'next/image';
import logo from '@/assets/images/tmmlogo.png';
import { addNewCompany } from '@/utils/companyProvider';
import { useSession } from 'next-auth/react';
import { addNewMover } from '@/utils/moverProvider';

const initialState = {
  imgUrl: '',
  ein: '',
  businessLicense: '',
  sole: true,
};

const UserVerification = ({ role }: { role: string }) => {
  const [state, setState] = useState({ ...initialState });

  const { imgUrl, ein, businessLicense, sole } = state;

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setState({
        ...state,
        imgUrl: onLoadEvent.target?.result as any,
      });
    };
    if (!e.target.files) {
      return;
    }
    reader.readAsDataURL(e.target?.files[0]);
  }

  return (
    <CardWrapper>
      {role === 'company' && (
        <div>
          <Label htmlFor='ownerId'>Upload your owner Id :</Label>
          <div className='flex flex-col items-center space-x-10 md:flex-row'>
            <div className='flex items-center justify-center w-full md:w-1/2'>
              <label
                htmlFor='fileInput'
                className='flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursorPointer h-23 bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 '
              >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <svg
                    aria-hidden='true'
                    className='w-10 h-10 mb-3 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                    ></path>
                  </svg>
                  <p className='mb-2 text-sm text-gray-500 '>
                    Click to upload or drag and drop you{' '}
                    <span className='font-semibold'>owner id</span>
                  </p>
                  <p className='text-xs text-gray-500 '>SVG, PNG, JPG or GIF</p>
                </div>
                <input
                  id='fileInput'
                  type='file'
                  className='hidden'
                  name='file'
                  onChange={handleImage}
                />
              </label>
            </div>
            <div>
              {imgUrl ? (
                <Image width='300' height='300' src={imgUrl} alt='preview' />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <Image
                  width={300}
                  height='300'
                  src='https://res.cloudinary.com/divg4kqqk/image/upload/v1676051218/3973481_egybzc.jpg'
                  alt='preview'
                />
              )}
            </div>
          </div>

          <div className='flex items-center mb-4'>
            <input
              onChange={(e) => setState({ ...state, sole: e.target.checked })}
              id='solePropLLCCorp'
              type='checkbox'
              checked={sole}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
            />
            <label
              htmlFor='solePropLLCCorp'
              className='ml-2 text-sm font-medium text-gray-400'
            >
              Sole prop, LLC or corp
            </label>
          </div>

          <div className='space-y-4'>
            {!sole && (
              <>
                <InputWrapper>
                  <Label htmlFor='ein'>EIN</Label>
                  <Input
                    id='ein'
                    placeholder='EIN'
                    onChange={(e) =>
                      setState({ ...state, ein: e.target.value })
                    }
                    value={ein}
                    required={true}
                    type='string'
                  />
                </InputWrapper>

                <InputWrapper>
                  <Label htmlFor='businessLicense'>Business License</Label>
                  <Input
                    id='businessLicense'
                    placeholder='Business License'
                    onChange={(e) =>
                      setState({ ...state, businessLicense: e.target.value })
                    }
                    value={businessLicense}
                    required={true}
                    type='string'
                  />
                </InputWrapper>
              </>
            )}
            <Button intent='primary' size='medium' type='submit'>
              Submit documents
              {/* {isLoading ? <Spinner /> : null} */}
            </Button>
          </div>
        </div>
      )}

      {role === 'employee' && (
        <div>
          <Label htmlFor='ownerId'>Upload your owner Id :</Label>
          <div className='flex flex-col items-center space-x-10 md:flex-row'>
            <div className='flex items-center justify-center w-full md:w-1/2'>
              <label
                htmlFor='fileInput'
                className='flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursorPointer h-23 bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 '
              >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <svg
                    aria-hidden='true'
                    className='w-10 h-10 mb-3 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                    ></path>
                  </svg>
                  <p className='mb-2 text-sm text-gray-500 '>
                    Click to upload or drag and drop you{' '}
                    <span className='font-semibold'>owner id</span>
                  </p>
                  <p className='text-xs text-gray-500 '>SVG, PNG, JPG or GIF</p>
                </div>
                <input
                  id='fileInput'
                  type='file'
                  className='hidden'
                  name='file'
                  onChange={handleImage}
                />
              </label>
            </div>
            <div>
              {imgUrl ? (
                <Image width='300' height='300' src={imgUrl} alt='preview' />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <Image
                  width={300}
                  height='300'
                  src='https://res.cloudinary.com/divg4kqqk/image/upload/v1676051218/3973481_egybzc.jpg'
                  alt='preview'
                />
              )}
            </div>
          </div>
        </div>
      )}
    </CardWrapper>
  );
};

export default UserVerification;
