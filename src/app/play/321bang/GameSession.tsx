'use client';

import { FullScreenMobileView } from '@/app/components/FullScreenMobileView';
import { ReactNode, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const LoadingScreen = () => {
  return (
    <FullScreenMobileView>
      <div className={'h-full flex flex-col justify-center items-center'}>
        Loading session...
      </div>
    </FullScreenMobileView>
  );
};

export function GameSession({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Only instantiate the socket if it doesn't exist.
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:8080/socket.io', {
        transports: ['websocket'],
      });
    }

    socketRef.current.emit('join', id);

    return () => {
      // Disconnect the socket when the component is unmounted.
      socketRef.current?.disconnect();
    };
  }, [id]);

  return <div>{children}</div>;
}
