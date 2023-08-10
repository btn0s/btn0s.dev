import { SectionTitle } from '@/components/bricks/headers';
import Main from '@/components/bricks/Main';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

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
        <Image
          src={coverImage}
          alt={'og'}
          className={'border border-black/50 rounded-md'}
        />
        <div
          className={
            'border border-black/50 rounded-md p-6 absolute top-[90%] bg-white/90 backdrop-filter backdrop-blur-sm shadow-xl sm:w-[300px] -inset-x-2 sm:inset-x-6'
          }
        >
          <SectionTitle>{title}</SectionTitle>
          <p className={'text-sm mb-4'}>{description}</p>
          <Link
            href={playLink}
            className={
              'py-2 block text-center w-full bg-black text-3xl text-white font-black rounded-md'
            }
          >
            PLAY
          </Link>
        </div>
      </section>
      <section className={'py-12 flex-col flex'}></section>
    </Main>
  );
};

export default GameInfoPage;
