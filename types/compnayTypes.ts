import { Prisma } from '@prisma/client';

const movingCompany = Prisma.validator<Prisma.MovingCustomerArgs>()({});

export type CompanyType = Prisma.MovingCompanyGetPayload<typeof movingCompany>;
