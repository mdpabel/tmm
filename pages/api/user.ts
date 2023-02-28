import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import prisma from '@/db/postgresql';
import { auth } from '@/middlewares/auth';
import { ReqType } from '@/types/reqType';

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
      const user = req.user;
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          // role: 'ADMIN',
        },
      });

      res.status(200).json({
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: 'Failed',
      });
    }
  });

export default handler;
