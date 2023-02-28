import { useState, useEffect } from 'react';
import { Socket } from 'socket.io';
import io from 'socket.io-client';

function useSocket() {
  const [socket, setSocket] = useState<any | null>(null);

  // @ts-ignore
  useEffect(() => {
    const newSocket = io('http://localhost:3000', {
      path: '/api/socketio',
    });

    setSocket(newSocket);

    if (newSocket) return () => newSocket.disconnect();
  }, []);

  return socket as Socket;
}

export default useSocket;
