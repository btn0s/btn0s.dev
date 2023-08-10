import Game from '@/app/play/321bang/Game';
import GameRouter from '@/components/GameRouter';
import GameInfoPage, { IGameInfoPageProps } from '@/templates/GameInfoPage';
import { Metadata, ResolvingMetadata } from 'next';
import bangCoverImage from '@/images/321bang-cover.png';
import Head from 'next/head';

const DATA: IGameInfoPageProps = {
  title: '3..2..1.. Bang',
  description:
    'A multiplayer game where you have to shoot your friends before they shoot you.',
  coverImage: bangCoverImage,
  playLink: '/play/321bang?p=true',
};

const metadata: Metadata = {
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

type Props = {
  params: { sid: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const sid = searchParams.sid;
  const parentResolved = { ...metadata };

  const previousTitle = parentResolved.title;

  return {
    title: sid ? 'Join my game! | 3..2..1.. BANG! by bnt0s' : previousTitle,
    description: sid
      ? 'Come test your reaction time in a 1v1 shootout.'
      : DATA.description,
  };
}

const Bang = () => {
  return (
    <GameRouter
      gameInfoComponent={<GameInfoPage {...DATA} />}
      gameComponent={<Game />}
    />
  );
};

export default Bang;
