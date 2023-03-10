import React, { useEffect, useState } from 'react';
import PaypalCheckout from './PaypalCheckout';
import StripeCheckout from './StripeCheckout';

const Checkout = ({ next, prev }: { next: () => void; prev: () => void }) => {
  const [type, setType] = useState('');

  useEffect(() => {
    const paymentMethod = window.localStorage.getItem('paymentMethod') ?? '';
    setType(paymentMethod);
  }, []);

  return type === 'card' ? (
    <StripeCheckout next={next} prev={prev} />
  ) : (
    <PaypalCheckout next={next} prev={prev} />
  );
};

export default Checkout;
