'use client';

import { useRef } from 'react';

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
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
