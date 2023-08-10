import { PageTitle } from '@/components/bricks/headers';
import HeroSection from '@/components/bricks/HeroSection';
import Main from '@/components/bricks/Main';
import ProjectCard from '@/components/ProjectCard';
import { PLAY_PAGE_LINKS } from '@/content/play';
import { EProjectType } from '@/content/projects';
import comingSoonCoverImg from '@/images/coming-soon-cover.png';
import { Metadata } from 'next';
import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';

export const metadata: Metadata = {
  title: 'play · btn0s.dev',
  description: "i make games sometimes, here's a collection of them",
  openGraph: {
    url: 'https://btn0s.dev',
    siteName: 'play · btn0s.dev',
    type: 'website',
    description: "i make games sometimes, here's a collection of them",
    images: [
      {
        url: '/games-og.png',
        width: 1200,
        height: 630,
        alt: 'play · btn0s.dev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const Games = () => {
  return (
    <Main>
      <HeroSection>
        <PageTitle className="flex flex-col gap-2 sm:gap-0 mb-6">
          <div>
            A small collection of{' '}
            <span className="inline-flex items-center gap-2 bg-[#f77041]/50 px-2 text-black transition hover:bg-[#f77041] hover:text-white hover:no-underline">
              games
            </span>
          </div>
          I&apos;ve been working on.
        </PageTitle>
        <p className="mb-4 text-lg font-normal [text-wrap:balance] sm:text-xl">
          Some of these are finished and playable, some are still in
          development, and some are just ideas.{' '}
        </p>
        <p className="mb-4 text-lg font-normal [text-wrap:balance] sm:text-xl">
          I&apos;ll be adding more as I go so check back soon!
        </p>
      </HeroSection>
      <section>
        <div className="flex flex-col sm:grid grid-cols-3 gap-4">
          {PLAY_PAGE_LINKS.map((link) => (
            <ProjectCard key={link.title} project={link} />
          ))}
          <div className={'grayscale opacity-30 pointer-events-none'}>
            <ProjectCard
              key={'bang-bang'}
              project={{
                title: 'BANG BANG',
                description: 'Sequel to the hit game 3..2..1.. BANG!',
                href: '/play',
                coverImage: comingSoonCoverImg,
                type: EProjectType.GAME,
              }}
            />
          </div>
          <div className={'grayscale opacity-30 pointer-events-none'}>
            <ProjectCard
              key={'echelon'}
              project={{
                title: 'Project Echelon',
                description: 'Asymmetrical multiplayer game of cat and mouse.',
                href: '/play',
                coverImage: comingSoonCoverImg,
                type: EProjectType.GAME,
              }}
            />
          </div>
          <div className="col-span-3 rounded-md py-12 text-gray-300 flex flex-col items-center justify-center">
            More coming soon!
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Games;
