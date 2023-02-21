import { Prisma } from '@prisma/client';

const job = Prisma.validator<Prisma.JobArgs>()({});

export type JobType = Prisma.JobGetPayload<typeof job>;
