'use client';

import { JSX } from 'react';

import { useSearchParams } from 'next/navigation';

const GameRouter = ({
  gameInfoComponent,
  gameComponent,
}: {
  gameInfoComponent: JSX.Element;
  gameComponent: JSX.Element;
}) => {
  const searchParams = useSearchParams();

  const play = searchParams.get('p');
  const sessionId = searchParams.get('sid') || undefined;

  return play || sessionId ? gameComponent : gameInfoComponent;
};

export default GameRouter;
