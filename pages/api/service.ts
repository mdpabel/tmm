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
        return res.status(401).json({
          data: 'You are not allowed to request the resources',
        });
      }

      const services = await prisma.service.findMany({
        where: {
          movingCompanyId: company.id,
        },
      });

      return res.status(200).json({
        data: services,
      });
    } catch (error) {
      handleError(res, error);
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

      if (!company?.id) {
        return res.status(401).json({
          data: 'Please login again',
        });
      }

      const { county, name, price, movers, hours, info, disclaimer, imgUrl } =
        req.body;

      if (
        !county ||
        !name ||
        !price ||
        !movers ||
        !hours ||
        !info ||
        !disclaimer ||
        !imgUrl
      ) {
        return res.status(400).json({
          data: 'county or name or price or movers or hours or info or disclaimer or imgUrl is missing',
        });
      }

      const newService = await prisma.service.create({
        data: {
          serviceName: '' + name,
          servicePrice: Number.parseFloat(price),
          serviceMovers: Number.parseInt(movers),
          serviceHours: Number.parseInt(hours),
          serviceDesc: '' + info,
          serviceCounty: '' + county,
          serviceDisclaimer: '' + disclaimer,
          serviceImg: '' + imgUrl,
          movingCompanyId: company?.id,
        },
      });

      try {
        await res.revalidate('/county-service');
        await res.revalidate('/county-service/' + newService.id);
        return res.status(201).json({
          data: newService,
        });
      } catch (error) {
        console.log(error);
        return res.status(201).json({
          data: newService,
        });
      }
    } catch (error) {
      handleError(res, error);
    }
  });

export default handler;
