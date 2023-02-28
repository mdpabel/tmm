import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '@/types/socket';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

/*eslint-disable */

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log('New Socket.io server...');
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: '/api/socketio',
    });
    res.socket.server.io = io;
  }
  res.end();
};
