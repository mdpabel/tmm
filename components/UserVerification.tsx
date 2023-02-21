'use client';
import React, {
  ChangeEvent,
  FormEventHandler,
  SyntheticEvent,
  useState,
} from 'react';
import { CardWrapper } from '@/components/Card';
import Input, { TextArea, Select } from '@/components/Input';
import Button from '@/components/Button';
import { cloudinaryImgUpload } from '@/utils/cloudinaryImgUpload';
import Title from '@/components/Title';
import { useAsync } from '@/hooks/useAsync';
import { addNewService } from '@/utils/serviceProviders';
import Spinner from '@/components/Spinner';
import Alert from '@/components/Alert';
import Image from 'next/image';
import logo from '@/assets/images/tmmlogo.png';
import { addNewCompany } from '@/utils/companyProvider';

const initialState = {
  companyName: '',
  companyInfo: '',
};

const UserVerification = () => {
  const [isPending, setIsPending] = useState(true);
  const [show, setShow] = useState(false);
  const { data, error, isLoading, isError, isSuccess, run } = useAsync();
  const [state, setState] = useState({ ...initialState });
  const { companyName, companyInfo } = state;

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    run(addNewCompany({ companyName, companyInfo }));
    setState({ ...initialState });
  }

  return (
    <CardWrapper>
      {!show && (
        <div className='max-w-xl p-8 text-center text-gray-800 lg:max-w-3xl rounded-3xl lg:p-12'>
          <h3 className='text-2xl'>
            Thank you for signing up! Your account has been created.
          </h3>
          <div className='flex justify-center py-8'>
            <Image src={logo} alt='Logo' width={120} height={120} />
          </div>
          <p>Your account is pending verification.</p>
          <div className='flex flex-col items-center mt-4'>
            <Button
              type='submit'
              intent='secondary'
              onClick={() => setShow(true)}
            >
              Verify Account
            </Button>
            <p className='mt-4 text-sm'>
              Please submit additional information or documents to verify your
              account.
            </p>
          </div>
        </div>
      )}

      {show && (
        <div>
          <Title>Please submit your business information</Title>
          <div className='pb-4'></div>
          <form onSubmit={handleSubmit}>
            <Input
              minLength={5}
              maxLength={100}
              focus={true}
              placeholder='Your company name'
              onChange={(e) =>
                setState({ ...state, companyName: e.target.value })
              }
              value={companyName}
              required={true}
              type='text'
            />

            <Input
              minLength={5}
              maxLength={100}
              focus={true}
              placeholder='Your company Info'
              onChange={(e) =>
                setState({ ...state, companyInfo: e.target.value })
              }
              value={companyInfo}
              required={true}
              type='text'
            />

            <div className='pt-2'>
              <Button intent='secondary' size='medium' type='submit'>
                Create Job
                {isLoading ? <Spinner /> : null}
              </Button>
            </div>
          </form>
        </div>
      )}
    </CardWrapper>
  );
};

export default UserVerification;
