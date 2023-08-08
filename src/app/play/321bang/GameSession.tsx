'use client';

import { FullScreenMobileView } from '@/app/components/FullScreenMobileView';
import { IMatchPhase } from '@/content/play';
import { LiveObject } from '@liveblocks/client';
import { ReactNode } from 'react';
import { RoomProvider } from '../../../../liveblocks.config';
import { ClientSideSuspense } from '@liveblocks/react';

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
  return (
    <RoomProvider
      id={id}
      initialPresence={{
        score: 0,
      }}
      initialStorage={{
        matchInfo: new LiveObject<{
          phase: IMatchPhase;
          countdown: number;
          winner: number | null;
        }>({
          phase: IMatchPhase.WAITING,
          countdown: 5,
          winner: null,
        }),
      }}
    >
      <ClientSideSuspense fallback={<LoadingScreen />}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
