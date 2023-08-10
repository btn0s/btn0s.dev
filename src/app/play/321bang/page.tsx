import Game from '@/app/play/321bang/Game';
import GameRouter from '@/components/GameRouter';
import GameInfoPage, { IGameInfoPageProps } from '@/templates/GameInfoPage';
import { Metadata, ResolvingMetadata } from 'next';
import bangCoverImage from '@/images/321bang-cover.png';

const DATA: IGameInfoPageProps = {
  title: '3..2..1.. BANG!',
  description:
    'A multiplayer game where you have to shoot your friends before they shoot you.',
  joinSessionDescription:
    'Come test your reaction time in a 1v1 shootout. Play 3..2..1.. BANG! with me now!',
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

  return {
    title: sid ? 'Join my game!' : metadata.title,
    description: sid ? DATA.joinSessionDescription : DATA.description,
    openGraph: metadata.openGraph
      ? {
          title: sid ? 'Join my game!' : metadata.openGraph.title,
          description: sid
            ? DATA.joinSessionDescription
            : metadata.openGraph.description,
          images: metadata.openGraph.images,
        }
      : undefined,
    twitter: metadata.twitter,
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
