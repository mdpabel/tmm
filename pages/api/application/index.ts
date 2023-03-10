import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db/postgresql';
import { auth } from '@/middlewares/auth';
import { ReqType } from 'types/reqType';
import { pusher } from '@/utils/pusher';
import { handleError } from '@/utils/ApiErrorHandling';

interface ApplicationType {
  name: string;
  jobApplicationLetter: string;
  jobId: number;
}

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
        where: {
          moverId: mover.id,
        },
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
    } catch (error) {
      handleError(res, error);
    }
  })
  .post(async (req, res) => {
    try {
      const user = req.user;

      const mover = await prisma.mover.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!mover) {
        return res.status(403).json({
          data: 'Only movers can apply',
        });
      }

      const { name, jobApplicationLetter, jobId }: ApplicationType = req.body;

      const job = await prisma.job.findFirst({
        where: {
          id: jobId,
        },
      });

      if (!job) {
        return res.status(403).json({
          data: 'There is no job with the application job id',
        });
      }

      const newApplication = await prisma.application.create({
        data: {
          applicantName: name,
          coverLetter: jobApplicationLetter,
          moverId: mover?.id,
          jobId: job.id,
        },
      });

      pusher.trigger('application', 'newApplication', newApplication);

      res.status(201).json({
        data: newApplication,
      });
    } catch (error) {
      handleError(res, error);
    }
  });

export default handler;
