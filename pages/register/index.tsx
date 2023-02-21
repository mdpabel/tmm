import AuthForm from '@/components/AuthForm';
import React from 'react';
import AppLayout from '@/layouts/AppLayout';

const Register = () => {
  return (
    <div className='lg:pt-5'>
      <AuthForm mode='register' />
    </div>
  );
};

Register.layout = AppLayout;

export default Register;
