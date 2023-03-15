// @ts-nocheck
import React, { FormEvent, useEffect, useState } from 'react';
import {
  loadStripe,
  StripeCardCvcElementChangeEvent,
  StripeCardNumberElementChangeEvent,
} from '@stripe/stripe-js';
import {
  PaymentElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  CardElement,
  Elements,
  useStripe,
  useElements,
  CardExpiryElementComponent,
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
import { useRouter } from 'next/router';

const stripePromise = loadStripe('pk_test_TnSeJTOWhtgY6rdr99Yge5mg00s1OIMymW');

interface PropTypes {
  next: () => void;
  prev: () => void;
}

interface CartService {
  id?: number;
  price: number;
  endTime: Date;
  reservationHours: number;
  startTime: Date;
}

export interface OrderDetailsType {
  city: string;
  endAddress: string;
  latitude: string;
  loading: true;
  longitude: string;
  notes: string;
  numberOfRooms: number;
  numberOfStairDimensions: number;
  numberOfStairFlights: number;
  numberOfStairFloors: number;
  place: string;
  specialItems: string;
  startAddress: string;
  state: string;
  unloading: true;
  zip: number;
}

const CheckoutForm = ({ next, prev }: PropTypes) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { run, data, error, isLoading, isSuccess, isError, setStatus } =
    useAsync();
  const stripe = useStripe();
  const elements = useElements();
  const [cart, setCart] = useState<CartService>();
  const [details, setDetails] = useState<OrderDetailsType>(
    {} as OrderDetailsType
  );
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardCvc: '',
    cardExpiry: '',
  });

  useEffect(() => {
    const cartService = JSON.parse(
      window.localStorage.getItem('cartService') ?? '{}'
    );
    const orderDetails = JSON.parse(
      window.localStorage.getItem('orderDetails') ?? '{}'
    );

    setCart(cartService);
    setDetails(orderDetails);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!cart) {
      alert('Please select your service first');
      return;
    }
    setStatus('PENDING');
    const { clientSecret } = await fetch('/api/stripe-payment-intent', {
      method: 'POST',
      body: JSON.stringify({
        cartService: cart,
        description: 'tmmemploy.com',
        receipt_email: (session as CustomSession)?.user?.email,
        shipping: details,
        name:
          (session as CustomSession)?.user?.firstName +
          ' ' +
          (session as CustomSession)?.user?.lastName,
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
          billing_details: {
            name:
              (session as CustomSession)?.user?.firstName +
              ' ' +
              (session as CustomSession)?.user?.lastName,
            email: (session as CustomSession)?.user?.email ?? '',
            address: {
              line1: details?.startAddress,
              line2: details?.endAddress,
              city: details?.city,
              postal_code: '' + details?.zip,
              state: details?.state,
            },
          },
        },
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace({
        pathname: router.pathname,
        query: {
          paymentStatus: 'success',
        },
      });
      next();
    }
    if (isError) {
      router.replace({
        pathname: router.pathname,
        query: {
          paymentStatus: 'failed',
        },
      });
      next();
    }
  }, [isError, isSuccess, next, router]);

  const handleChange = (
    e:
      | StripeCardNumberElementChangeEvent
      | StripeCardCvcElementChangeEvent
      | any
  ) => {
    setErrors({ ...errors, [e.elementType]: e?.error?.message });
  };

  useEffect(() => {}, [elements]);

  const cardNumber = elements?.getElement(CardNumberElement);
  const isNumberInvalid = cardNumber?._invalid;
  const isNumberEmpty = cardNumber?._empty;
  const isCardNumberValid = !(isNumberEmpty || isNumberInvalid);

  const cardCvc = elements?.getElement(CardCvcElement);
  const isCvcInvalid = cardCvc?._invalid;
  const isCvcEmpty = cardCvc?._empty;
  const isCvcValid = !(isCvcEmpty || isCvcInvalid);

  const cardExp = elements?.getElement(CardExpiryElement);
  const isExpInvalid = cardExp?._invalid;
  const isExpEmpty = cardExp?._empty;
  const isExpValid = !(isExpEmpty || isExpInvalid);

  const isEmpty = Object.values(errors).every((val) => val === '');
  const hasError = Object.values(errors).some((val) => val !== undefined);

  return (
    <>
      <CardWrapper>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='card'>Card Number</Label>
              <CardNumberElement
                onChange={handleChange}
                className='px-4 py-2 border rounded-md'
                options={{
                  showIcon: true,
                  style: {
                    base: {},
                  },
                }}
                id='card'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='cvc'>CVC</Label>
              <CardCvcElement
                onChange={handleChange}
                className='px-4 py-2 border rounded-md'
                id='cvc'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='expire'>Expiration Date</Label>
              <CardExpiryElement
                onChange={handleChange}
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
              <Button
                type='submit'
                disabled={
                  !isCardNumberValid ||
                  !isExpValid ||
                  !isCvcValid ||
                  isEmpty ||
                  hasError
                }
              >
                Pay {isLoading ? <Spinner /> : <RightArrow />}
              </Button>
            </div>
          </div>
        </form>
      </CardWrapper>

      <div className='flex justify-center pt-8'>
        <ul>
          {Object.values(errors)?.map((message, idx) => {
            if (message === '') {
              return (
                <li key={idx}>😩 {Object.keys(errors)[idx]} is required</li>
              );
            }
            return <li key={idx}>{message && `😩 ${message}`}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

const StripeCheckout = ({
  next,
  prev,
}: {
  next: () => void;
  prev: () => void;
}) => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm next={next} prev={prev} />
      </Elements>
    </div>
  );
};

export default StripeCheckout;
