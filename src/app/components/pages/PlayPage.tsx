'use client';

import { useRef } from 'react';

import PageWrapper from '@/app/components/PageWrapper';
import ProjectCard from '@/components/ProjectCard';
import { PageTitle } from '@/components/bricks/headers';
import { PLAY_PAGE_LINKS } from '@/content/play';
import useHoverTilt from '@/hooks/useHoverTilt';

const PlayPage = () => {
  const ref = useRef<HTMLDivElement>(null);

  useHoverTilt(ref, {
    tiltModifier: 0.2,
    scaleModifier: 1,
  });

  return (
    <PageWrapper hoverTargetRef={ref} key="play">
      <section className="flex flex-col">
        <div className="px-6 py-12">
          <PageTitle className="mb-6 flex flex-col gap-2 sm:gap-0">
            <div>
              A small collection of{' '}
              <span className="inline-flex items-center gap-2 bg-[#f77041]/50 px-2 text-black transition hover:bg-[#f77041] hover:text-white hover:no-underline">
                games
              </span>
            </div>
            I&apos;ve been working on.
          </PageTitle>
          <p className="font-normal [text-wrap:balance] sm:text-xl">
            Some of these are finished and playable, some are still in
            development, and some are just ideas.{' '}
          </p>
        </div>
      </section>
      <section className="flex grid-cols-3 flex-col gap-4 p-6 sm:grid">
        {PLAY_PAGE_LINKS.map((link) => (
          <ProjectCard key={link.title} project={link} />
        ))}
      </section>
    </PageWrapper>
  );
};

export default PlayPage;
