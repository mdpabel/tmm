import { Prisma } from '@prisma/client';
import { CompanyType } from '@/types/compnayTypes';

const service = Prisma.validator<Prisma.ServiceArgs>()({});

export type ServiceType = Prisma.ServiceGetPayload<typeof service> & {
  company: CompanyType;
};
