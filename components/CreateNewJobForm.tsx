import React, { SyntheticEvent, useState } from 'react';
import { CardWrapper } from '@/components/Card';
import Input, { TextArea, Select } from '@/components/Input';
import Button from '@/components/Button';
import Title from '@/components/Title';
import { useAsync } from '@/hooks/useAsync';
import Spinner from '@/components/Spinner';
import Alert from '@/components/Alert';
import { createNewJob } from '@/utils/jobProvider';

const jobPositions = [
  {
    label: 'Select Job Position',
    value: '',
  },
  {
    label: 'Driver',
    value: 'Driver',
  },
  {
    label: 'Mover',
    value: 'Mover',
  },
];

const counties = [
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
  position: '',
  county: '',
  title: '',
  rate: 0,
  description: '',
};

const CreateNewJob = () => {
  const { data, error, isLoading, isError, isSuccess, run } = useAsync();
  const [state, setState] = useState({ ...initialState });
  const { position, rate, title, county, description } = state;

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    run(createNewJob({ position, rate, title, county, description }));
    setState({ ...initialState });
  }

  return (
    <div>
      <Title>Create New Job</Title>
      <div className='flex items-center justify-center w-full pt-4'>
        {isSuccess && (
          <Alert intent='success'>Successfully added new job</Alert>
        )}
        {isError && (
          <Alert intent='danger'>
            {error ? error : 'Failed to create new job'}
          </Alert>
        )}
      </div>
      <CardWrapper>
        <form onSubmit={handleSubmit}>
          <Select
            required={true}
            options={jobPositions}
            onChange={(e) => {
              setState({ ...state, position: e });
            }}
          />

          <Select
            required={true}
            options={counties}
            onChange={(e) => {
              setState({ ...state, county: e });
            }}
          />

          <Input
            minLength={10}
            maxLength={100}
            focus={true}
            placeholder='Title'
            onChange={(e) => setState({ ...state, title: e.target.value })}
            value={title}
            required={true}
            type='text'
          />

          <Input
            minLength={10}
            maxLength={100}
            focus={true}
            placeholder='Rate'
            onChange={(e) => setState({ ...state, rate: +e.target.value })}
            value={rate === 0 ? '' : rate}
            required={true}
            type='number'
          />

          <TextArea
            placeholder='Description'
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
            value={description}
          />

          <div className='pt-2'>
            <Button intent='secondary' size='medium' type='submit'>
              Create Job
              {isLoading ? <Spinner /> : null}
            </Button>
          </div>
        </form>
      </CardWrapper>
    </div>
  );
};

export default CreateNewJob;
