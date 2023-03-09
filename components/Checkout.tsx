import React, { FormEvent, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
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
import { useAsync } from '@/hooks/useAsync';
import Spinner from './Spinner';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/types/session';

const stripePromise = loadStripe('pk_test_TnSeJTOWhtgY6rdr99Yge5mg00s1OIMymW');

interface PropTypes {
  next: () => void;
  prev: () => void;
}

interface CartService {
  id?: number;
  price: number;
}

const CheckoutForm = ({ next, prev }: PropTypes) => {
  const { data: session } = useSession();
  const { run, data, error, isLoading, isSuccess, isError } = useAsync();
  const stripe = useStripe();
  const elements = useElements();
  const [cart, setCart] = useState<CartService>();
  const [details, setDetails] = useState({});

  useEffect(() => {
    const cartService = JSON.parse(
      window.localStorage.getItem('cartService') ?? '{}'
    );
    const orderDetails = JSON.parse(
      window.localStorage.getItem('orderDetails') ?? '{}'
    );
    const paymentMethod = window.localStorage.getItem('paymentMethod');

    setCart(cartService);
    setDetails(orderDetails);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!cart) {
      alert('Please select your service first');
      return;
    }

    // const name =
    //   (session as CustomSession)?.user?.firstName +
    //   ' ' +
    //   (session as CustomSession)?.user?.lastName;

    // const address = details.city + ' -> ' + details.endAddress;

    // let shipping = {
    //   address,
    //   name,
    // };

    // if (!address || !name) {
    //   shipping = null;
    // }

    const { clientSecret } = await fetch('/api/stripe-payment-intent', {
      method: 'POST',
      body: JSON.stringify({
        cartService: cart,
        description: 'tmmemploy.com',
        receipt_email: (session as CustomSession)?.user?.email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    if (elements == null || !stripe || !clientSecret) {
      return;
    }
    run(
      stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement)!,
        },
      })
    );
  };

  console.log(data, isSuccess, isError, error, isLoading);

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
              Pay {isLoading ? <Spinner /> : <RightArrow />}
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
