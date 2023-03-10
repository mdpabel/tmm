import Title from '@/components/Title';
import DashboardLayout from '@/layouts/DashboardLayout';
import React, { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/types/session';
import Button from '@/components/Button';

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

const Input = ({
  readOnly,
  value,
  type = 'text',
  placeholder,
  id,
}: {
  readOnly?: boolean;
  value?: string;
  type?: string;
  placeholder?: string;
  id?: string;
}) => {
  return (
    <input
      id={id}
      placeholder={placeholder}
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5 active:border-0 outline-none focus:border-gray-300'
      type={type}
      value={value}
      readOnly={readOnly}
    />
  );
};

const Profile = () => {
  const { data } = useSession();
  const session = data as CustomSession;

  return (
    <div className='w-full max-w-2xl space-y-4'>
      <Title>Update your profile</Title>
      <div className='flex pt-6 space-x-4'>
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
        <Label htmlFor='fName'>Old Password</Label>
        <Input id='fName' placeholder='Enter your old password' />
      </div>

      <div className='w-full'>
        <Label htmlFor='lName'>New Password</Label>
        <Input id='lName' placeholder='Enter your new password' />
      </div>

      <Button>Update profile</Button>
    </div>
  );
};

Profile.layout = DashboardLayout;

export default Profile;
