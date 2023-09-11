import { Metadata } from 'next';

import ProjectCard from '@/components/ProjectCard';
import HeroSection from '@/components/bricks/HeroSection';
import Main from '@/components/bricks/Main';
import { PageTitle } from '@/components/bricks/headers';
import { PLAY_PAGE_LINKS } from '@/content/play';
import { EProjectType } from '@/content/projects';
import comingSoonCoverImg from '@/images/coming-soon-cover.png';

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
        <PageTitle className="mb-6 flex flex-col gap-2 sm:gap-0">
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
        <div className="flex grid-cols-3 flex-col gap-4 sm:grid">
          {PLAY_PAGE_LINKS.map((link) => (
            <ProjectCard key={link.title} project={link} />
          ))}
          <div className="pointer-events-none opacity-30 grayscale">
            <ProjectCard
              key="bang-bang"
              project={{
                title: 'BANG BANG',
                description: 'Sequel to the hit game 3..2..1.. BANG!',
                href: '/play',
                coverImage: comingSoonCoverImg,
                type: EProjectType.GAME,
              }}
            />
          </div>
          <div className="pointer-events-none opacity-30 grayscale">
            <ProjectCard
              key="echelon"
              project={{
                title: 'Project Echelon',
                description: 'Asymmetrical multiplayer game of cat and mouse.',
                href: '/play',
                coverImage: comingSoonCoverImg,
                type: EProjectType.GAME,
              }}
            />
          </div>
          <div className="col-span-3 flex flex-col items-center justify-center rounded-md py-12 text-gray-300">
            More coming soon!
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Games;
