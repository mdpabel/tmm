import React, { FormEvent } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Label } from './Input';
import Link from 'next/link';
import Button from './Button';
import LeftArrow from './icons/LeftArrow';
import RightArrow from './icons/RightArrow';
import { CardWrapper } from './Card';

const stripePromise = loadStripe('pk_test_TnSeJTOWhtgY6rdr99Yge5mg00s1OIMymW');

interface PropTypes {
  next: () => void;
  prev: () => void;
}

const CheckoutForm = ({ next, prev }: PropTypes) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe?.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  };

  return (
    <CardWrapper>
      <form onSubmit={handleSubmit}>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='card'>Card Number</Label>
            <CardNumberElement
              className='px-4 py-2 border rounded-md'
              options={{
                style: {
                  base: {},
                },
              }}
              id='card'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='cvc'>CVC</Label>
            <CardCvcElement className='px-4 py-2 border rounded-md' id='cvc' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='expire'>Expiration Date</Label>
            <CardExpiryElement
              className='px-4 py-2 border rounded-md'
              id='expire'
            />
          </div>
          <p className='text-base'>
            By purchasing one or more products, you acknowledge that you have
            read and agreed to our{' '}
            <Link
              className='text-orange-600 underline'
              href='/terms-and-conditions'
            >
              Terms and Conditions.
            </Link>
          </p>

          <div className='flex justify-between'>
            <Button onClick={() => prev()}>
              <LeftArrow />
              Back
            </Button>
            <Button type='submit' disabled={!stripe || !elements}>
              Pay <RightArrow />
            </Button>
          </div>
        </div>
      </form>
    </CardWrapper>
  );
};

const Checkout = ({ next, prev }: { next: () => void; prev: () => void }) => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm next={next} prev={prev} />
      </Elements>
    </div>
  );
};

export default Checkout;
