import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db/postgresql';

import { auth } from '@/middlewares/auth';
import { ReqType } from 'types/reqType';
import { NextApiResponseServerIO } from '@/types/socket';
import { pusher } from '@/utils/pusher';
import { handleError } from '@/utils/ApiErrorHandling';

interface ApplicationType {
  name: string;
  jobApplicationLetter: string;
  jobId: number;
}

const handler = nc<ReqType, NextApiResponseServerIO>({
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
    const { id } = req.query;

    const mover = await prisma.mover.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!mover) {
      return res.status(403).json({
        data: 'You are not allowed to request the page',
      });
    }

    const applications = await prisma.application.findMany({
      include: {
        job: {
          include: {
            company: true,
          },
        },
      },
    });

    if (!applications) {
      return res.status(404).json({
        data: 'Sorry, we could not find any applications associated with your account at this time. Please check back later.',
      });
    }

    res.status(200).json({
      data: applications,
    });
  })
  .put(async (req, res) => {
    try {
      const { id } = req.query;
      const applicationId = id;
      const { status, jobId, orderId } = req.body;

      let updatedApplication;

      if (!applicationId || !status) {
        return res.status(204).json({
          data: 'applicationId id and status are required',
        });
      }

      if (orderId) {
        const isExistOrder = await prisma.order.findFirst({
          where: {
            id: orderId,
          },
        });

        if (!isExistOrder) {
          return res.status(400).json({
            data: `No order found with the Id ${orderId}`,
          });
        }

        updatedApplication = await prisma.application.update({
          where: {
            id: +applicationId,
          },
          data: {
            applicationStatus: status,
            orderId: isExistOrder?.id,
          },
        });
      } else {
        updatedApplication = await prisma.application.update({
          where: {
            id: +applicationId,
          },
          data: {
            applicationStatus: status,
          },
        });
      }

      if (status === 'ACCEPTED' && updatedApplication) {
        await prisma.job.update({
          where: {
            id: +jobId,
          },
          data: {
            jobStatus: status,
          },
        });
      }
      // res?.socket?.server?.io?.emit('updatedApplication', updatedApplication);
      pusher.trigger('application', 'updatedApplication', updatedApplication);

      res.status(200).json({
        data: updatedApplication,
      });
    } catch (error) {
      handleError(res, error);
    }
  });

export default handler;
