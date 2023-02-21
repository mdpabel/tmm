import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import prisma from '@/db/postgresql';
import { serialize } from 'cookie';
import { hashPassword } from '@/utils/password';
import { createToken } from '@/utils/jwtToken';
import { UserType } from '@/types/userType';

const roles = {
  employee: 'MOVER',
  customer: 'MOVING_CUSTOMER',
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

    console.log('API ', role);

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        role: roles[role],
        password: hashedPassword,
      },
    });

    const token = createToken({ id: newUser.id, role: newUser.role });

    res.setHeader(
      'Set-Cookie',
      serialize(process.env.COOKIES_NAME, token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    );

    res.status(201).json({
      data: 'Registered Successfully',
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: 'Registration Failed',
    });
  }
});

export default handler;
