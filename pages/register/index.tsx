// @ts-nocheck
import AuthForm from '@/components/AuthForm';
import React, { FormEvent, useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import Button from '@/components/Button';
import Link from 'next/link';
import SelectRole from '@/components/SelectRole';
import { useRouter } from 'next/router';
import { useMultiSteps } from '@/hooks/usemultisteps';
import clsx from 'clsx';
import UserVerification from '@/components/UserVerification';

const messages = [
  'SelectRole',
  'Register',
  'Submit Documents',
  'Registration Success',
];

const Register = () => {
  const router = useRouter();
  const [role, setRole] = useState('');
  const [selectedRole, setSelectedRole] = useState(false);
  const { currentStepIndex, Step, steps, prev, next, goTo, isFirst, isLast } =
    useMultiSteps([AuthForm, UserVerification, AuthForm, AuthForm]);

  const handleRole = (e: FormEvent) => {
    e.preventDefault();
    if (role == '') {
      alert('Please select your account type');
      return;
    }
    setSelectedRole(true);
  };

  const handleStep = (idx: number) => {
    if (idx === 0 || isFirst) {
      setSelectedRole(false);
      return;
    }
    if (idx > currentStepIndex) return;
    goTo(idx);
  };

  return (
    <div className='flex-auto pt-10'>
      {!selectedRole && (
        <form onSubmit={handleRole}>
          <SelectRole role={role} setRole={setRole} />
        </form>
      )}
      {selectedRole && role === 'client' && <AuthForm mode='register' />}
      {selectedRole && (role === 'company' || role === 'employee') && (
        <div className=''>
          <ol className='flex items-center w-full mb-4 sm:mb-5'>
            {steps.map((_, idx) => (
              <div
                className={clsx({
                  'w-full': idx !== steps.length - 1,
                })}
                key={idx}
              >
                <li
                  className={clsx({
                    "flex w-full items-center after:content-[''] after:w-full":
                      true,
                    ' after:border-b after:border-blue-100 after:border-4 after:h-1 after:inline-block ':
                      idx !== steps.length - 1,
                    'after:border-green-600': idx < currentStepIndex,
                  })}
                >
                  <div
                    onClick={() => handleStep(idx)}
                    className={clsx({
                      'flex items-center justify-center w-10 h-10 border-4 rounded-full lg:h-14 lg:w-14 shrink-0 cursor-pointer':
                        true,
                      'border-green-600 text-green-500 font-bold':
                        idx < currentStepIndex,
                    })}
                  >
                    {idx + 1}
                  </div>
                </li>
                <div className='text-xs md:text-base'>
                  <div>{messages[idx].split(' ')[0]}</div>
                  <div>{messages[idx].split(' ')[1]}</div>
                </div>
              </div>
            ))}
          </ol>
          {<Step role={role} mode='register' next={next} />}
        </div>
      )}
    </div>
  );
};

Register.layout = AppLayout;

export default Register;
