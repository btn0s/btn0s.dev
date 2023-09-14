'use client';

import { useRef } from 'react';

import { LuMail, LuPhoneCall } from 'react-icons/lu';

import HeroLink from '@/app/components/HeroLink';
import PageWrapper from '@/app/components/PageWrapper';
import HomeSpaceView from '@/app/components/three/HomeStars';
import { PageTitle } from '@/components/bricks/headers';
import useHoverTilt from '@/hooks/useHoverTilt';

const HomePage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useHoverTilt(ref, {
    tiltModifier: 0.2,
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
          <div className="flex flex-1 flex-col gap-2 p-6">
            <p className="text-lg font-normal [text-wrap:balance] sm:text-xl">
              I&apos;m a web developer and product designer with a passion for
              building interactive, human-centered experiences that solve
              focused problems.
            </p>
            <div className="mt-auto flex flex-col gap-2">
              <h3 className="flex items-center gap-2 text-3xl">
                <LuMail />
                <HeroLink href="mailto:brendan@thinkhuman.co">
                  brendan@thinkhuman.co
                </HeroLink>
              </h3>
              <h3 className="flex items-center gap-2 text-3xl">
                <LuPhoneCall />
                <HeroLink href="tel:+19845281225">+1 984 528 1225</HeroLink>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
