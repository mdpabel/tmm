import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest } from 'next';

export interface ReqType extends NextApiRequest, JwtPayload {}
