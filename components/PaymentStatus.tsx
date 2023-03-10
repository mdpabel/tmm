import React from 'react';
import Alert from '@/components/Alert';
import { useRouter } from 'next/router';

const Success = () => {
  return (
    <div className='min-w-[300px] md:min-w-[800px] shadow-md rounded  bg-white'>
      <div className='px-12 py-14'>
        <Alert intent='success'>
          Your payment has been successfully processed.
        </Alert>
      </div>
    </div>
  );
};

const Failed = () => {
  return (
    <div className='min-w-[300] md:min-w-800 shadow-md rounded  bg-white'>
      <div className='px-12 py-14'>
        <Alert intent='warning'>
          Oops! There was an error processing your payment. Please contact
          customer support for assistance.
        </Alert>
      </div>
    </div>
  );
};

const PaymentStatus = () => {
  const router = useRouter();

  const { paymentStatus } = router.query;

  return paymentStatus === 'success' ? <Success /> : <Failed />;
};

export default PaymentStatus;
