import type { Metadata } from 'next';
import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';

import ProjectGrid from '@/components/ProjectGrid';
import HeroSection from '@/components/bricks/HeroSection';
import Main from '@/components/bricks/Main';
import { PageTitle, SectionTitle } from '@/components/bricks/headers';

export const metadata: Metadata = {
  title: 'btn0s.dev',
  description: 'i do some things around the web, this is a home for them',
  openGraph: {
    url: 'https://btn0s.dev',
    siteName: 'btn0s.dev',
    description: 'i do some things around the web, this is a home for them',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'btn0s.dev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

const Home = () => {
  return (
    <Main>
      <HeroSection>
        <PageTitle className="flex flex-col gap-2 sm:gap-0">
          <div>
            I do all things web{' '}
            <Link
              className="inline-flex items-center gap-2 bg-[#f77041]/50 px-2 text-black transition hover:bg-[#f77041] hover:text-white hover:no-underline"
              href="https://playbackbone.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              @backbone
              <HiExternalLink className="opacity-50" />
            </Link>
          </div>

          <div>
            I co-founded{' '}
            <Link
              className="inline-flex items-center gap-2 bg-[#d2e4da] px-2 text-black transition hover:bg-[#366e4f] hover:text-white hover:no-underline"
              href="https://thinkhuman.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              @thinkhumanco
              <HiExternalLink className="opacity-50" />
            </Link>
          </div>

          <div>
            and I build{' '}
            <Link
              className="group relative inline-flex items-center gap-2 bg-gray-300 px-2 text-black transition hover:bg-gray-800 hover:text-white hover:no-underline"
              href="/play"
            >
              video games
              <HiExternalLink className="opacity-50" />
              <span className="pointer-events-none absolute top-full block w-full translate-y-[6px] text-center text-sm opacity-0 transition group-hover:translate-y-[0px] group-hover:text-black group-hover:opacity-100 sm:pointer-events-auto">
                (ask me about my current project)
              </span>
            </Link>{' '}
            for fun
          </div>
        </PageTitle>
      </HeroSection>

      <section className="">
        <p className="mb-4 text-lg font-normal [text-wrap:balance] sm:text-xl">
          you can contact me at{' '}
          <Link
            className="inline-flex items-center gap-1 bg-blue-200 px-2 text-black transition hover:bg-blue-500 hover:text-white hover:no-underline"
            href="mailto:brendan@thinkhuman.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>brendan@thinkhuman.co</span>
            <HiExternalLink className="opacity-50" />
          </Link>{' '}
        </p>
      </section>

      <section className="isolate pb-12">
        <SectionTitle className="mb-4">featured</SectionTitle>
        <ProjectGrid />
      </section>
    </Main>
  );
};

export default Home;
