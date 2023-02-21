import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import prisma from '@/db/postgresql';
import { compareHashedPassword } from '@/utils/password';
import { createToken } from '@/utils/jwtToken';
import { serialize } from 'cookie';

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something went wrong!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end;
    ('Page not found');
  },
}).post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({
        data: 'Invalid credentials',
      });
    }

    const validPassword = await compareHashedPassword(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        data: 'Invalid credentials',
      });
    }

    const token = createToken({
      id: user.id,
      role: user.role,
    });

    res.setHeader(
      'Set-Cookie',
      serialize(process.env.COOKIES_NAME, token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    );

    res.status(200).json({
      data: 'Login success',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ data: 'Invalid login' });
  }
});

export default handler;
