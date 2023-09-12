'use client';
import { FC, PropsWithChildren, useRef } from 'react';

import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';

import PageWrapper from '@/app/components/PageWrapper';
import HomeSpaceView from '@/app/components/three/HomeStars';
import { PageTitle } from '@/components/bricks/headers';
import useHoverTilt from '@/hooks/useHoverTilt';

// export const metadata: Metadata = {
//   title: 'btn0s.dev',
//   description: 'i do some things around the web, this is a home for them',
//   openGraph: {
//     url: 'https://btn0s.dev',
//     siteName: 'btn0s.dev',
//     description: 'i do some things around the web, this is a home for them',
//     type: 'website',
//     images: [
//       {
//         url: '/og.png',
//         width: 1200,
//         height: 630,
//         alt: 'btn0s.dev',
//       },
//     ],
//   },
//   twitter: {
//     card: 'summary_large_image',
//   },
// };

const HeroLink: FC<
  PropsWithChildren<{ href: string; backgroundColor?: string }>
> = ({ href, backgroundColor, children }) => (
  <Link
    className="group relative isolate inline-flex items-center px-2 text-black transition hover:text-white hover:no-underline active:scale-[0.98]"
    href={href}
    target={href.startsWith('/') ? undefined : '_blank'}
    rel={
      href.startsWith('/') ? undefined : 'noopener noreferrer nofollow external'
    }
    style={{
      backgroundColor: backgroundColor
        ? `${backgroundColor}${50}`
        : '#1f293750',
    }}
  >
    <span className="gap flex gap-2">
      {children}
      <HiExternalLink className="opacity-50" />
    </span>
    <div
      className="absolute inset-0 z-[-1] origin-right scale-x-0 transition duration-300 ease-soft-spring group-hover:origin-left sm:group-hover:scale-x-100"
      style={{
        backgroundColor: backgroundColor ? backgroundColor : '#1f2937',
      }}
    ></div>
  </Link>
);

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);

  useHoverTilt(ref, {
    tiltModifier: 0.1,
    scaleModifier: 1,
  });

  return (
    <PageWrapper hoverTargetRef={ref} key="home">
      <div className="flex h-full flex-col sm:flex-row">
        <div className="max-h-[300px] flex-1 bg-[#1c1c1c] sm:max-h-full">
          <HomeSpaceView hoverTargetRef={ref} />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-2 border-black p-6 pb-8 sm:gap-0 sm:border-b-2">
            <PageTitle className="flex flex-col gap-2 sm:gap-0">
              <div>
                I do all things web{' '}
                <HeroLink
                  href="https://playbackbone.com"
                  backgroundColor="#f77041"
                >
                  @backbone
                </HeroLink>
              </div>

              <div>
                I co-founded{' '}
                <HeroLink
                  href="https://thinkhuman.co"
                  backgroundColor="#366e4f"
                >
                  @thinkhumanco
                </HeroLink>
              </div>

              <div>
                and I build <HeroLink href="/play">video games</HeroLink> for
                fun
              </div>
            </PageTitle>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
