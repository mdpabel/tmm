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
  const signingSecret = process.env.STRIPE_SIGNING_SECRETE;
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
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
      const serviceId = paymentIntentSucceeded?.metadata?.service_id;
      const customerEmail = paymentIntentSucceeded?.receipt_email;
      const orderDetails: OrderDetailsType =
        paymentIntentSucceeded?.orderDetails;

      if (!totalPrice || !serviceId || !customerEmail) {
        return res.status(400).json({
          data: 'Price or service or customer email is missing',
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

      await prisma.order.create({
        data: {
          totalPrice,
          userId: user.id,
          serviceId: serviceId,
          OrderDetails: {
            create: {
              startAddress: orderDetails.startAddress,
              endAddress: orderDetails.endAddress,
              state: orderDetails.state,
              city: orderDetails.city,
              zip: '' + orderDetails.zip,
              loading: orderDetails.loading,
              unloading: orderDetails.unloading,
              numberOfRooms: orderDetails.numberOfRooms,
              numberOfStairFlights: orderDetails.numberOfStairFlights,
              numberOfStairFloors: orderDetails.numberOfStairFloors,
              numberOfStairDimensions: orderDetails.numberOfStairDimensions,
              specialItems: orderDetails.specialItems,
              notes: orderDetails.notes,
              latitude: orderDetails.latitude,
              longitude: orderDetails.longitude,
            },
          },
        },
      });

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
