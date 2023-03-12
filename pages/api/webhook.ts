import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';

import { stripe } from './stripe-payment-intent';
import prisma from '@/db/postgresql';
import { OrderDetailsType } from '@/components/StripeCheckout';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const signature = req.headers['stripe-signature'];
  const signingSecret = process.env.STRIPE_SIGNING_SECRETE as string;
  const reqBuffer = await buffer(req);

  if (!signature) {
    return res.status(400);
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      // @ts-ignore
      data: `Webhook error ${error.message}`,
    });
  }

  switch (event.type) {
    case 'payment_intent.payment_failed':
      const paymentIntentPaymentFailed = event.data.object;
      // Then define and call a function to handle the event payment_intent.payment_failed
      console.log('Webhook =>');
      console.log(paymentIntentPaymentFailed);
      break;
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object as any;
      // Then define and call a function to handle the event payment_intent.succeeded
      const totalPrice = paymentIntentSucceeded?.amount;
      const metadata = paymentIntentSucceeded?.metadata;
      const customerEmail = paymentIntentSucceeded?.receipt_email;

      if (!totalPrice || !metadata || !customerEmail) {
        return res.status(400).json({
          data: 'Price or metadata or customer email is missing',
        });
      }

      const user = await prisma.user.findFirst({
        where: {
          email: customerEmail,
        },
      });

      if (!user) {
        return res.status(400).json({
          data: 'User not found with the email',
        });
      }

      const service = await prisma.service.findFirst({
        where: {
          id: +metadata.service_id,
        },
      });

      if (!service) {
        return res.status(400).json({
          data: `No service found with the service id ${metadata.service_id}`,
        });
      }

      const newOrder = await prisma.order.create({
        data: {
          totalPrice,
          userId: user.id,
          serviceId: service.id,
        },
      });

      return res.status(200).json({
        data: newOrder,
        isTrue: true,
      });

      // await prisma.orderDetails.create({
      //   data: {
      //     startAddress: metadata.startAddress,
      //     endAddress: metadata.endAddress,
      //     state: metadata.state,
      //     city: metadata.city,
      //     zip: metadata.zip,
      //     loading: Boolean(metadata.loading),
      //     unloading: Boolean(metadata.unloading),
      //     numberOfRooms: +metadata.numberOfRooms,
      //     numberOfStairFlights: +metadata.numberOfStairFlights,
      //     numberOfStairFloors: +metadata.numberOfStairFloors,
      //     numberOfStairDimensions: +metadata.numberOfStairDimensions,
      //     specialItems: metadata.specialItems,
      //     notes: metadata.notes,
      //     latitude: metadata.latitude,
      //     longitude: metadata.longitude,
      //     orderId: newOrder.id,
      //   },
      // });

      // receipt_email;
      // amount
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({
    received: true,
  });
}
