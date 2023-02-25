import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db/postgresql';
import { auth } from '@/middlewares/auth';
import { ReqType } from 'types/reqType';

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
  .post(async (req, res) => {
    try {
      const user = req.user;

      const { bio, mobile } = req.body;

      console.log(bio, mobile);

      const newMover = await prisma.mover.create({
        data: {
          bio,
          mobile,
          userId: user.id,
        },
      });

      res.status(201).json({
        data: newMover,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        data: 'Something went wrong',
        error: error,
      });
    }
  });

export default handler;
