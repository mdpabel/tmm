import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import prisma from '@/db/postgresql';
import { auth } from '@/middlewares/auth';
import { ReqType } from '@/types/reqType';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

const handler = nc<ReqType, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found!');
  },
})
  // .use(auth)
  .post(async (req, res) => {
    const {
      cartService,
      shipping,
      receipt_email,
      customerId,
      description,
      name,
    } = req.body;

    if (!cartService || !cartService.price) {
      return res.status(400).json({
        data: 'Service price is required field to create payment intent',
      });
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        description,
        amount: +cartService?.price * 100,
        currency: 'usd',
        payment_method_types: ['card'],
        receipt_email,
        shipping: {
          name,
          address: {
            line1: shipping?.startAddress,
            line2: shipping?.endAddress,
            city: shipping?.city,
            postal_code: shipping?.zip,
            state: shipping?.state,
          },
        },
        customer: customerId,
      });

      res.status(200).json({
        data: {
          clientSecret: paymentIntent.client_secret,
        },
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        data: error,
        message: 'An error occurred, Unable to create payment intent',
      });
    }
  });

export default handler;
