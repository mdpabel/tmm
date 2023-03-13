import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/db/postgresql';

import { auth } from '@/middlewares/auth';
import { ReqType } from 'types/reqType';
import { CompanyType } from '@/types/compnayTypes';
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
  .get(async (req, res) => {
    try {
    } catch (error) {
      handleError(res, error);
    }
  })
  .post(async (req, res) => {
    try {
      const {
        idCardImage,
        userId,
        ein,
        businessLicense,
        sole,
        companyName,
      }: CompanyType = req.body;

      const user = await prisma.user.findFirst({
        where: {
          id: +userId,
        },
      });

      if (!user) {
        return res.status(403).json({
          data: 'User does not exist, Please register first to verify your company',
        });
      }

      if (!sole && (!idCardImage || !ein || !businessLicense || !companyName)) {
        return res.status(403).json({
          data: 'idCardImage or ein or businessLicense or companyName is invalid',
        });
      }

      const newCompany = await prisma.movingCompany.create({
        data: {
          idCardImage,
          ein,
          businessLicense,
          sole,
          companyName,
          userId: user.id,
        },
      });

      await prisma.user.update({
        where: {
          id: +userId,
        },
        data: {
          hasUploadedDocuments: true,
          role: 'MOVING_COMPANY',
        },
      });

      res.status(201).json({
        data: newCompany,
      });
    } catch (error) {
      handleError(res, error);
    }
  });

export default handler;
