import React, {
  ChangeEvent,
  FormEventHandler,
  SyntheticEvent,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
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
import DashboardLayout from '@/layouts/DashboardLayout';

const initialState = {
  county: '',
  name: '',
  price: '',
  movers: '',
  hours: '',
  info: '',
  disclaimer: '',
  imgUrl: '',
};

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

const AddService = () => {
  const { data, error, isLoading, isError, isSuccess, run } = useAsync();
  const router = useRouter();
  const [state, setState] = useState({ ...initialState });
  const { county, price, name, movers, hours, info, disclaimer, imgUrl } =
    state;

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

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const fileInput = (e.target as HTMLFormElement).fileInput.files;

    const secureUrl = await cloudinaryImgUpload(fileInput);

    console.log(secureUrl);

    run(addNewService({ ...state, imgUrl: secureUrl as string }));
    // router.refresh();
  }

  return (
    <div>
      <Title>Add new service</Title>
      <div className='flex items-center justify-center w-full pt-4'>
        {isSuccess && (
          <Alert intent='success'>Successfully added new service</Alert>
        )}
        {isError && <Alert intent='danger'>Failed to add new service</Alert>}
      </div>
      <CardWrapper>
        <form onSubmit={handleSubmit}>
          <Select
            required={true}
            options={options}
            onChange={(e) => {
              setState({ ...state, county: e });
            }}
          />

          <Input
            minLength={10}
            maxLength={100}
            focus={true}
            placeholder='Service Title'
            onChange={(e) => setState({ ...state, name: e.target.value })}
            value={name}
            required={true}
            type='string'
          />

          <Input
            min={1}
            focus={true}
            placeholder='Service Price'
            onChange={(e) => setState({ ...state, price: e.target.value })}
            value={price}
            required={true}
            type='number'
          />

          <Input
            min={1}
            focus={true}
            placeholder='Number of movers'
            onChange={(e) => setState({ ...state, movers: e.target.value })}
            value={movers}
            required={true}
            type='number'
          />

          <Input
            min={2}
            focus={true}
            placeholder='Hours: 2hr minimum'
            onChange={(e) => setState({ ...state, hours: e.target.value })}
            value={hours}
            required={true}
            type='number'
          />

          <TextArea
            placeholder='Information'
            onChange={(e) => setState({ ...state, info: e.target.value })}
            value={info}
          />

          <TextArea
            placeholder='Disclaimer'
            onChange={(e) => setState({ ...state, disclaimer: e.target.value })}
            value={disclaimer}
          />

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
                    <span className='font-semibold'>Click to upload</span> or
                    drag and drop
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
                <img
                  width={300}
                  height='300'
                  src='https://res.cloudinary.com/divg4kqqk/image/upload/v1676051218/3973481_egybzc.jpg'
                  alt='preview'
                />
              )}
            </div>
          </div>

          <div>
            <Button intent='secondary' size='medium' type='submit'>
              Add Service
              {isLoading ? <Spinner /> : null}
            </Button>
          </div>
        </form>
      </CardWrapper>
    </div>
  );
};

AddService.layout = DashboardLayout;

export default AddService;
