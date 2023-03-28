import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { CardBody, CardHeader, CardWrapper } from './Card';
import Input from './Input';
import Button from './Button';
import Link from 'next/link';
import Alert from './Alert';
import Spinner from './Spinner';
import { useRouter } from 'next/router';
import { useAsync } from '@/hooks/useAsync';
import { register } from '@/utils/authProvider';
import { UserType } from '@/types/userType';
import { signIn } from 'next-auth/react';

const registerContent = {
  linkUrl: '/login',
  label: 'Already have an account?',
  linkText: 'Login',
  header: 'Create a new account',
  subHeader: 'Just a few things to get started',
  buttonText: 'Register',
};

const signInContent = {
  linkUrl: '/register',
  label: "Don't have an account?",
  linkText: 'register',
  header: 'Welcome back',
  subHeader: 'Enter your credentials to access your account',
  buttonText: 'Sign In',
};

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

type modeType = 'register' | 'signin';

const AuthForm = ({
  mode,
  next,
  role,
}: {
  mode: modeType;
  next?: () => void;
  role?: string;
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
  } = useAsync<UserType>();
  const [formState, setFormState] = useState(initialState);
  const router = useRouter();

  const content = mode === 'register' ? registerContent : signInContent;
  const { firstName, lastName, email, password } = formState;

  const handleFormSubmission = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (mode === 'register') {
      if (!role) return;
      run(register({ firstName, lastName, email, password, role }));
    } else if (mode === 'signin') {
      // run(signIn({ email, password }));
      setStatus('PENDING');
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res && res.ok) {
        const redirectURL = router?.query.returnUrl || '/dashboard';
        // @ts-ignore
        router.replace(redirectURL);
        setStatus('SUCCESS');
        setValue('Login success');
      } else {
        setStatus('ERROR');
        setErrorMessage('Invalid email or password');
      }
    }
  };

  useEffect(() => {
    if (isSuccess && mode === 'register' && role !== 'client' && next) {
      router.replace({
        pathname: router.pathname,
        query: { userId: data?.id },
      });
      next();
    }
  }, [data?.id, isSuccess, mode, next, role, router]);

  return (
    <CardWrapper>
      <CardHeader>
        <h2 className='mb-2 text-xl md:text-3xl'>{content.header}</h2>
        <p className='text-sm md:text-lg text-black/75'>{content.subHeader}</p>
      </CardHeader>

      {isError && <Alert intent='danger'>{error}</Alert>}
      {isSuccess && (
        <Alert intent='success'>
          {mode === 'register' ? 'Register Success' : 'Login Success'}
        </Alert>
      )}

      <CardBody>
        <form onSubmit={handleFormSubmission} className='space-y-6'>
          {mode === 'register' && (
            <div className='flex space-x-4'>
              <Input
                focus={true}
                placeholder='First Name'
                onChange={(e) =>
                  setFormState({ ...formState, firstName: e.target.value })
                }
                value={firstName}
                required={true}
                type='string'
              />

              <Input
                placeholder='Last Name'
                onChange={(e) =>
                  setFormState({ ...formState, lastName: e.target.value })
                }
                value={lastName}
                required={true}
                type='string'
              />
            </div>
          )}

          <Input
            focus={mode === 'signin' ? true : false}
            placeholder='test@tmmemploy.com'
            // pattern='/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/'
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            value={email}
            minLength={10}
            maxLength={70}
            required={true}
            type='email'
          />

          <Input
            placeholder='******'
            minLength={4}
            maxLength={30}
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
            value={password}
            required={true}
            type='password'
          />

          <div className='flex flex-col items-center justify-between space-y-4 md:space-y-0 md:flex-row'>
            <div className='text-sm md:text-lg'>
              <span>
                {content.label}
                <Link
                  className='font-medium text-blue-600'
                  href={content.linkUrl}
                >
                  {' '}
                  {content.linkText}
                </Link>
              </span>
            </div>
            <Button intent='primary' size='medium' type='submit'>
              {content.buttonText}
              {isLoading ? <Spinner /> : null}
            </Button>
          </div>
        </form>
      </CardBody>
    </CardWrapper>
  );
};

export default AuthForm;
