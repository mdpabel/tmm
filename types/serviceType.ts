import { Prisma } from '@prisma/client';

const service = Prisma.validator<Prisma.ServiceArgs>()({});

export type ServiceType = Prisma.ServiceGetPayload<typeof service>;
