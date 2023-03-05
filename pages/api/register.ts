import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import prisma from '@/db/postgresql';
import { hashPassword } from '@/utils/password';
import { UserType } from '@/types/userType';
import { handleError } from '@/utils/ApiErrorHandling';

const roles = {
  employee: 'MOVER',
  client: 'MOVING_CUSTOMER',
  company: 'MOVING_COMPANY',
};

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found!');
  },
}).post(async (req, res) => {
  try {
    let { firstName, lastName, email, password, role }: UserType = req.body;

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        // @ts-ignore
        role: roles[role],
      },
    });

    res.status(201).json({
      data: newUser,
    });
  } catch (error) {
    handleError(res, error);
  }
});

export default handler;
