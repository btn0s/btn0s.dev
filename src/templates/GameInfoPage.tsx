'use client';

import { SectionTitle } from '@/components/bricks/headers';
import Main from '@/components/bricks/Main';
import Image from 'next/image';
import bangCoverImage from '@/images/321bang.png';
import Link from 'next/link';

const GameInfoPage = () => {
  return (
    <Main>
      <section className={'relative pt-12'}>
        <Image
          src={bangCoverImage}
          alt={'og'}
          className={'border border-black/50 rounded-md'}
        />
        <div
          className={
            'border border-black/50 rounded-md p-6 absolute top-[90%] bg-white/90 backdrop-filter backdrop-blur-sm shadow-xl sm:w-[300px] -inset-x-2 sm:inset-x-6'
          }
        >
          <SectionTitle>3, 2, 1... BANG!</SectionTitle>
          <p className={'text-sm mb-4'}>
            A multiplayer game where you have to shoot your friends before they
            shoot you.
          </p>
          <Link
            href={`${window.location}?p=true`}
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
