// @ts-nocheck
import FinalStepIcon from '@/components/icons/FinalStepIcon';
import ShippingAddress from '@/components/ShippingAddress';
import { useMultiSteps } from '@/hooks/usemultisteps';
import AppLayout from '@/layouts/AppLayout';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import Checkout from '@/components/Checkout';
import SelectPaymentMethod from '@/components/SelectPaymentMethod';
import PaymentStatus from '@/components/PaymentStatus';

const messages = [
  'Service Selection',
  'Moving Address',
  'Payment Method',
  'Payment Form',
  'Purchase Status',
];

const OrderDetails = () => {
  const router = useRouter();
  const { currentStepIndex, Step, steps, prev, next, goTo, isFirst, isLast } =
    useMultiSteps([
      ShippingAddress,
      SelectPaymentMethod,
      Checkout,
      PaymentStatus,
      '',
    ]);

  useEffect(() => {
    const cartService = JSON.parse(
      window.localStorage.getItem('cartService') ?? '{}'
    );
    if (Object.keys(cartService).length === 0) {
      alert('Please select your service');
      router.push(`/county-service`);
    }
  }, [router]);

  const handleStep = (idx) => {
    if (idx === 0 || isFirst) {
      const { id } = JSON.parse(
        window.localStorage.getItem('cartService') ?? '{}'
      );
      if (!id) {
        return;
      }
      router.push(`/county-service/${id}`);
      return;
    }
    if (idx > currentStepIndex) return;
    goTo(idx);
  };

  return (
    <div className='flex-auto max-w-5xl px-5 mx-auto'>
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
                  'border-green-600 text-green-500 font-medium':
                    idx < currentStepIndex ||
                    currentStepIndex === steps.length - 1,
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
      {<Step prev={prev} next={next} />}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession({
    req: context.req,
  });

  if (!session) {
    return {
      redirect: {
        destination: '/login?returnUrl=/order-details',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

OrderDetails.layout = AppLayout;

export default OrderDetails;
