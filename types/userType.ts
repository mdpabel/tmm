import { Prisma } from '@prisma/client';

const user = Prisma.validator<Prisma.UserArgs>()({});

export type UserType = Prisma.UserGetPayload<typeof user>;
