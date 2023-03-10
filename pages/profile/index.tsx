import Title from '@/components/Title';
import DashboardLayout from '@/layouts/DashboardLayout';
import React, {
  ReactNode,
  useEffect,
  useState,
  ChangeEvent,
  InputHTMLAttributes,
  FormEvent,
} from 'react';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/types/session';
import Button from '@/components/Button';
import { useAsync } from '@/hooks/useAsync';
import { updateStatus } from '@/utils/applicationProvider';
import { updatePassword } from '@/utils/userProvider';
import Spinner from '@/components/Spinner';
import Alert from '@/components/Alert';

const Label = ({
  children,
  htmlFor,
}: {
  children: ReactNode;
  htmlFor?: string;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className='block mb-2 text-sm font-medium text-gray-900 '
    >
      {children}
    </label>
  );
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  validation?: object;
  focus?: boolean;
}

const Input = ({
  placeholder,
  onChange,
  value = '',
  type = 'text',
  focus,
  id,
  min,
  minLength,
  max,
  maxLength,
  pattern,
  readOnly,
}: InputProps) => {
  return (
    <input
      // @ts-ignore
      onChange={(e) => onChange(e)}
      id={id}
      placeholder={placeholder}
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5 active:border-0 outline-none focus:border-gray-300'
      type={type}
      value={value}
      readOnly={readOnly}
    />
  );
};

const initialState = {
  newPass: '',
  oldPass: '',
};

const Profile = () => {
  const [state, setState] = useState({ ...initialState });
  const {
    run,
    isSuccess,
    isLoading,
    isError,
    error,
    data: resData,
  } = useAsync();
  const { data } = useSession();
  const session = data as CustomSession;

  const { newPass, oldPass } = state;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    run(updatePassword({ newPass, oldPass }));
  };

  return (
    <div className='w-full max-w-2xl'>
      <form className='space-y-4 ' onSubmit={handleSubmit}>
        <Title>Update your profile</Title>
        <div className='pt-6 '>
          {isError && <Alert intent='danger'>{error}</Alert>}
          {isSuccess && (
            <Alert intent='success'>
              {resData ?? 'Password updated successfully'}
            </Alert>
          )}
        </div>
        <div className='flex space-x-4 '>
          <div className='w-full'>
            <Label htmlFor='fName'>First Name</Label>
            <Input value={session?.user?.firstName ?? ''} readOnly={true} />
          </div>
          <div className='w-full'>
            <Label htmlFor='fName'>Last Name</Label>
            <Input value={session?.user?.lastName ?? ''} readOnly={true} />
          </div>
        </div>
        <div className='w-full'>
          <Label htmlFor='fName'>Email</Label>
          <Input value={session?.user?.email ?? ''} readOnly={true} />
        </div>

        <div className='w-full'>
          <Label htmlFor='fName'>Role</Label>
          <Input value={session?.user?.role ?? ''} readOnly={true} />
        </div>

        <div className='w-full'>
          <Label htmlFor='oldPass'>Old Password</Label>
          <Input
            type='password'
            value={oldPass}
            onChange={(e) => setState({ ...state, oldPass: e.target.value })}
            id='oldPass'
            placeholder='Enter your old password'
          />
        </div>

        <div className='w-full'>
          <Label htmlFor='newPass'>New Password</Label>
          <Input
            type='password'
            value={newPass}
            onChange={(e) => setState({ ...state, newPass: e.target.value })}
            id='newPass'
            placeholder='Enter your new password'
          />
        </div>

        <Button type='submit'>
          Update Profile
          {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

Profile.layout = DashboardLayout;

export default Profile;
