import { NextApiResponse } from 'next';

import { ReqType } from 'types/reqType';
import { getToken } from 'next-auth/jwt';

export const auth = async (req: ReqType, res: NextApiResponse, next: any) => {
  const token = await getToken({
    req: req,
    cookieName: process.env.COOKIES_NAME,
    secret: process.env.JWR_SECRETE,
  });

  console.log(token);

  if (!token) {
    return res.status(401).json({
      data: 'Unauthorized user',
    });
  }

  req.user = token;
  next();
};
