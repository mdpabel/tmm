import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import prisma from '@/db/postgresql';
import { auth } from '@/middlewares/auth';
import { ReqType } from '@/types/reqType';
import { compareHashedPassword, hashPassword } from '@/utils/password';

const handler = nc<ReqType, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found!');
  },
})
  .use(auth)
  .get(async (req, res) => {
    try {
      const user = req.user;

      if (user.role !== 'ADMIN') {
        return res.status(401).json({
          data: '',
        });
      }

      res.status(200).json({
        data: 'users',
      });
    } catch (error) {}
  })
  .put(async (req, res) => {
    try {
      const { oldPass, newPass } = req.body;

      if (newPass.length < 8 || oldPass < 8) {
        return res.status(400).json({
          data: 'Password should be at least 8 characters',
        });
      }

      const user = req.user;

      const userObj = await prisma.user.findFirst({
        where: {
          email: user.email,
        },
      });

      const oldPasswordMatches = await compareHashedPassword(
        oldPass,
        userObj?.password ?? ''
      );

      if (!oldPasswordMatches) {
        res.status(401).json({ data: 'Old password is incorrect' });
        return;
      }

      const newHashedPassword = await hashPassword(newPass);

      await prisma.user.update({
        where: {
          email: userObj?.email,
        },
        data: {
          password: newHashedPassword,
        },
      });

      res.status(200).json({ data: 'Password updated successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: 'Failed',
      });
    }
  });

export default handler;
