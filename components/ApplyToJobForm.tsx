import React, { SyntheticEvent, useEffect, useState } from 'react';
import Input from './Input';
import { TextArea } from '@/components/Input';
import Button from '@/components/Button';
import Title from '@/components/Title';
import Alert from '@/components/Alert';
import { useAsync } from '@/hooks/useAsync';
import { applyToJob } from '@/utils/applicationProvider';
import Spinner from '@/components/Spinner';

const initialState = {
  name: '',
  jobApplicationLetter: '',
};

const ApplyJobForm = ({
  jobId,
  setIsOpen,
}: {
  jobId: number;
  setIsOpen: any;
}) => {
  const {
    data,
    error,
    isLoading,
    setStatus,
    setValue,
    setErrorMessage,
    isError,
    isSuccess,
    run,
  } = useAsync();
  const [formState, setFormState] = useState({ ...initialState });

  const { name, jobApplicationLetter } = formState;

  const handleApplyJobForm = (e: SyntheticEvent) => {
    e.preventDefault();

    run(applyToJob({ name, jobApplicationLetter, jobId }));
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setFormState({ ...initialState });
        setIsOpen(false);
      }, 1500);
    }
  }, [isSuccess, setIsOpen]);

  return (
    <div>
      <Title>Job Application</Title>
      <div className='flex items-center justify-center w-full pt-4'>
        {isSuccess && (
          <Alert intent='success'>Your Application Has Been Received</Alert>
        )}
        {isError && (
          <Alert intent='danger'>
            {error ? error : 'Failed to submit your application'}
          </Alert>
        )}
      </div>
      <form onSubmit={handleApplyJobForm} className='space-y-6'>
        <Input
          focus={true}
          placeholder='Name'
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
          value={name}
          required={true}
          type='string'
        />

        <TextArea
          placeholder='Cover letter'
          onChange={(e) =>
            setFormState({ ...formState, jobApplicationLetter: e.target.value })
          }
          value={jobApplicationLetter}
        />
        <Button intent='secondary' size='medium' type='submit'>
          Apply Now
          {isLoading ? <Spinner /> : null}
        </Button>
      </form>
    </div>
  );
};

export default ApplyJobForm;
