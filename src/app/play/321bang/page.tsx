'use client';

import BangGame from '@/app/play/321bang/BangGame';
import GameInfoPage from '@/templates/GameInfoPage';
import { useSearchParams } from 'next/navigation';

const Bang = () => {
  const searchParams = useSearchParams();

  const play = searchParams.get('p');
  const sessionId = searchParams.get('sid') || undefined;

  return play || sessionId ? <BangGame /> : <GameInfoPage />;
};

export default Bang;
