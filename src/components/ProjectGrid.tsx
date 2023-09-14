'use client';

import { useRef } from 'react';

import classNames from 'classnames';

import ProjectCard from '@/components/ProjectCard';
import { FEATURED_PROJECTS } from '@/content/projects';

const ProjectGrid = () => {
  const centerViewportRef = useRef(null);

  return (
    <>
      <div
        className={classNames(
          'group/cards flex flex-col gap-4 pb-12 sm:grid sm:grid-cols-2',
        )}
      >
        {FEATURED_PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      <div
        ref={centerViewportRef}
        className="fixed left-0 top-[50svh] h-[1px] w-full"
      />
    </>
  );
};

export default ProjectGrid;
