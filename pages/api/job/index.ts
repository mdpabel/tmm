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
      const user = req.user;
      const company = await prisma.movingCompany.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!company) {
        return res.status(403).json({
          data: 'You are not allowed to request the page',
        });
      }

      const jobs = await prisma.job.findMany({
        where: {
          movingCompanyId: company.id,
        },
        include: {
          applications: {
            include: {
              mover: {
                include: {
                  user: {
                    select: {
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!jobs) {
        return res.status(404).json({
          data: 'No jobs found, please post a new job',
        });
      }

      res.status(200).json({
        data: jobs,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        data: 'Something went wrong',
        error: error,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const user = req.user;
      const company = await prisma.movingCompany.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!company) {
        return res.status(403).json({
          data: 'Please verify you as company owner',
        });
      }

      const { position, rate, title, county, description }: JobType = req.body;

      if (!position || !rate || !title || !county || !description) {
        return res.status(500).json({
          data: 'One or more properties are missing or invalid.',
        });
      }

      const newJob = await prisma.job.create({
        data: {
          position,
          rate,
          title,
          county,
          description,
          movingCompanyId: company?.id,
        },
      });

      // await res.revalidate('/jobs');
      try {
        await res.revalidate('/jobs');
        await res.revalidate('/jobs/' + newJob.id);
        return res.status(201).json({
          data: newJob,
        });
      } catch (error) {
        console.log(error);
        return res.status(201).json({
          data: newJob,
        });
      }
    } catch (error) {
      console.error(error);

      res.status(500).json({
        data: 'Something went wrong',
        error: error,
      });
    }
  });

export default handler;
