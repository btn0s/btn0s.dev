import HeroSection from '@/components/bricks/HeroSection';
import Main from '@/components/bricks/Main';
import type { Metadata } from 'next';
import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';

import { PageTitle, SectionTitle } from '@/components/bricks/headers';
import ProjectGrid from '@/components/ProjectGrid';

export const metadata: Metadata = {
  title: 'btn0s.dev',
  description: 'i do some things around the web, this is a home for them',
  openGraph: {
    url: 'https://btn0s.dev',
    siteName: 'btn0s.dev',
    description: 'i do some things around the web, this is a home for them',
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
            <span className="group relative inline-flex items-center gap-2 bg-gray-300 px-2 text-black transition hover:bg-gray-800 hover:no-underline">
              <span className="group-hover:text-white">video games</span>
              <span className="absolute top-full block w-full translate-y-[6px] pointer-events-none sm:pointer-events-auto text-center text-sm opacity-0 transition group-hover:translate-y-[0px] group-hover:opacity-100">
                (some of which you can find{' '}
                <Link href={'/play'} className={'underline'}>
                  here
                </Link>
                )
              </span>
            </span>{' '}
            for fun.
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
