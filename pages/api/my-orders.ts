import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db/postgresql';
import { ReqType } from 'types/reqType';
import { CompanyType } from '@/types/compnayTypes';
import { handleError } from '@/utils/ApiErrorHandling';
import { EmployeeType } from '@/types/employeeTypes';
import { auth } from '@/middlewares/auth';

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
      const orders = await prisma.order.findMany({
        where: {
          userId: user.id,
        },
        include: {
          service: {
            include: {
              company: true,
            },
          },
        },
      });

      if (orders.length === 0) {
        return res.status(400).json({
          data: 'No orders found. Please try again later if you already placed any orders',
        });
      }

      return res.status(200).json({
        data: orders,
      });
    } catch (error) {
      handleError(res, error);
    }
  });

export default handler;
