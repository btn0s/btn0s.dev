import Game from '@/app/play/321bang/Game';
import GameRouter from '@/components/GameRouter';
import GameInfoPage, { IGameInfoPageProps } from '@/templates/GameInfoPage';
import { Metadata } from 'next';
import bangCoverImage from '@/images/321bang.png';

const DATA: IGameInfoPageProps = {
  title: '3..2..1.. Bang',
  description:
    'A multiplayer game where you have to shoot your friends before they shoot you.',
  coverImage: bangCoverImage,
  playLink: '/play/321bang?p=true',
};

export const metadata: Metadata = {
  title: `${DATA.title} | Games by bnt0s`,
  description: DATA.description,
  openGraph: {
    title: DATA.title,
    description: DATA.description,
    images: [
      {
        url: bangCoverImage.src,
        width: bangCoverImage.width,
        height: bangCoverImage.height,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const Bang = () => {
  return (
    <GameRouter
      gameInfoComponent={<GameInfoPage {...DATA} />}
      gameComponent={<Game />}
    />
  );
};

export default Bang;
