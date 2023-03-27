import AuthForm from '@/components/AuthForm';
import AppLayout from '@/layouts/AppLayout';
import React from 'react';

const Login = () => {
  return (
    <div className='max-w-xl mx-auto'>
      <AuthForm mode='signin' />
    </div>
  );
};

Login.layout = AppLayout;

export default Login;
