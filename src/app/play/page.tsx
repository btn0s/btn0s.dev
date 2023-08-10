import { PageTitle } from '@/components/bricks/headers';
import HeroSection from '@/components/bricks/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import { PLAY_PAGE_LINKS } from '@/content/play';
import { Metadata } from 'next';
import Main from '@/components/bricks/Main';

export const metadata: Metadata = {
  title: 'Games by @btn0s',
  description: "This is a collection of games I've made",
  openGraph: {
    url: 'https://btn0s.dev',
    siteName: 'BT Norris | @btn0s',
    images: [
      {
        url: '/games-og.png',
        width: 1200,
        height: 630,
        alt: 'BT Norris | @btn0s',
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
          I&apos;ve worked on recently
        </PageTitle>
      </HeroSection>
      <section>
        <div className="flex flex-col sm:grid grid-cols-3 gap-4">
          {PLAY_PAGE_LINKS.map((link) => (
            <ProjectCard key={link.title} project={link} />
          ))}
        </div>
      </section>
    </Main>
  );
};

export default Games;
