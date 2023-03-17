import { Prisma } from '@prisma/client';
import { OrderType } from '@/types/orderTypes';
import { OrderDetailsType } from './../components/StripeCheckout';

const application = Prisma.validator<Prisma.ApplicationArgs>()({});

export type ApplicationType = Prisma.ApplicationGetPayload<
  typeof application
> & {
  order: OrderType & {
    OrderDetails: OrderDetailsType[];
  };
};
