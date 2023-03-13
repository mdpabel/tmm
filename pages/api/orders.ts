import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db/postgresql';

import { auth } from '@/middlewares/auth';
import { ReqType } from 'types/reqType';
import { handleError } from '@/utils/ApiErrorHandling';

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
      const company = await prisma.movingCompany.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!company) {
        return res.status(400).json({
          data: 'No company has been registered with the user',
        });
      }

      const orders = await prisma.order.findMany({
        where: {
          service: {
            movingCompanyId: company?.id,
          },
        },
        include: {
          service: true,
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (orders.length === 0) {
        return res.status(404).json({
          data: 'No orders found',
        });
      }

      res.status(200).json({
        data: orders,
      });
    } catch (error) {
      handleError(res, error);
    }
  });

export default handler;
