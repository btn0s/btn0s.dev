import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import Main from '@/components/bricks/Main';
import { SectionTitle } from '@/components/bricks/headers';

export interface IGameInfoPageProps {
  title: string;
  description: string;
  joinSessionDescription?: string;
  coverImage: StaticImageData;
  playLink: string;
}

const GameInfoPage = ({
  title,
  description,
  coverImage,
  playLink,
}: IGameInfoPageProps) => {
  return (
    <Main>
      <section className={'relative pt-12'}>
        <div className={'rounded-md border border-black/50 p-6 shadow-xl'}>
          <Image
            src={coverImage}
            alt={'og'}
            className={'mb-4 rounded-md border border-black/50'}
          />
          <SectionTitle>{title}</SectionTitle>
          <p className={'mb-4 text-sm'}>{description}</p>
          <Link
            href={playLink}
            className={
              'block w-full rounded-md bg-black py-2 text-center text-3xl font-black text-white'
            }
          >
            PLAY
          </Link>
        </div>
      </section>
      <section className={'flex flex-col py-12'}></section>
    </Main>
  );
};

export default GameInfoPage;
