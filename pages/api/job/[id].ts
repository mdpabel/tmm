import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db/postgresql';
import { verifyToken } from '@/utils/jwtToken';
import { auth } from '@/middlewares/auth';
import { ReqType } from 'types/reqType';
import { JobType } from '@/types/jobType';

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
      const { id } = req.query;

      const job = await prisma.job.findFirst({
        where: {
          // @ts-ignore
          id: Number.parseInt(id),
        },
      });

      res.status(200).json({
        data: job,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        data: 'Something went wrong',
      });
    }
  })
  .put(async (req, res) => {
    const { id } = req.query;
    const jobId = id;
    const { status } = req.body;

    if (!jobId || !status) {
      return res.status(204).json({
        data: 'job id and status are required',
      });
    }

    const updatedJob = await prisma.job.update({
      where: {
        id: +jobId,
      },
      data: {
        jobStatus: status,
      },
    });

    res.status(200).json({
      data: updatedJob,
    });
  });

export default handler;
