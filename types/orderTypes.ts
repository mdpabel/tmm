import { Prisma } from '@prisma/client';
import { CompanyType } from '@/types/compnayTypes';

const orders = Prisma.validator<Prisma.OrderArgs>()({});
const service = Prisma.validator<Prisma.ServiceArgs>()({});

export type OrderType = Prisma.OrderGetPayload<typeof orders> & {
  service: Prisma.ServiceGetPayload<typeof service> & {
    company: CompanyType;
  };
};
