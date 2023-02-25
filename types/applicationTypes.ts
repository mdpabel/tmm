import { Prisma } from '@prisma/client';

const application = Prisma.validator<Prisma.ApplicationArgs>()({});

export type ApplicationType = Prisma.ApplicationGetPayload<typeof application>;
