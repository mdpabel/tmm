import { NextApiRequest, NextApiResponse } from 'next';

export const handleError = (res: NextApiResponse, error: any) => {
  console.log('API ERROR', error);

  if (error && error?.code === 'P2002') {
    const messages = [];
    for (let i = 0; i < error?.meta?.target.length; i++) {
      messages.push(error?.meta?.target[i] + ' already exists');
    }

    return res.status(403).json({
      data: messages[0],
    });
  }

  res.status(500).json({
    data: 'Something went wrong',
  });
};
