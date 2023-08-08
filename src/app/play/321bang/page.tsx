'use client';

import BangGame from '@/app/play/321bang/BangGame';
import GameInfoPage, { IGameInfoPageProps } from '@/templates/GameInfoPage';
import { useSearchParams } from 'next/navigation';
import bangCoverImage from '@/images/321bang.png';

const DATA: IGameInfoPageProps = {
  title: '3..2..1.. Bang',
  description:
    'A multiplayer game where you have to shoot your friends before they shoot you.',
  coverImage: bangCoverImage,
  playLink: '/play/321bang?p=true',
};

const Bang = () => {
  const searchParams = useSearchParams();

  const play = searchParams.get('p');
  const sessionId = searchParams.get('sid') || undefined;

  return play || sessionId ? <BangGame /> : <GameInfoPage {...DATA} />;
};

export default Bang;
