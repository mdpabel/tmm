import { Prisma } from '@prisma/client';

const employee = Prisma.validator<Prisma.MoverArgs>()({});

export type EmployeeType = Prisma.MoverGetPayload<typeof employee>;
