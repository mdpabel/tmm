import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import prisma from '@/db/postgresql';
import { hashPassword } from '@/utils/password';
import { UserType } from '@/types/userType';
import { handleError } from '@/utils/ApiErrorHandling';
import { auth } from '@/middlewares/auth';
import { ReqType } from '@/types/reqType';

const roles = {
  employee: 'MOVER',
  client: 'MOVING_CUSTOMER',
  company: 'MOVING_COMPANY',
};

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
    const user = req.user;
    try {
      const mover = await prisma.mover.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!mover) {
        return res.status(400).json({
          data: 'Only movers can request the API',
        });
      }

      const scheduled = await prisma.application.findMany({
        where: {
          moverId: mover?.id,
        },
        include: {
          order: {
            include: {
              OrderDetails: true,
            },
          },
        },
      });

      res.status(201).json({
        data: scheduled,
      });
    } catch (error) {
      handleError(res, error);
    }
  });

export default handler;
