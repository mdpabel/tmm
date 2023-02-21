import { NextApiResponse } from 'next';
import { verifyToken } from '@/utils/jwtToken';
import { ReqType } from 'types/reqType';

export const isAdmin = (req: ReqType, res: NextApiResponse, next: any) => {
  const token = req.cookies[process.env.COOKIES_NAME];
  if (!token) {
    return res.status(401).json({
      data: 'Unauthorized user',
    });
  }

  const user = verifyToken(token);

  if (!user || user.role !== 'ADMIN') {
    return res.status(401).json({
      data: 'Unauthorized user',
    });
  }
  req.user = user;
  next();
};
