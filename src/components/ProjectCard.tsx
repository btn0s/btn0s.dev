'use client';

import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

import { useIsMobile } from '@nextui-org/use-is-mobile';
import classNames from 'classnames';
import NextImage from 'next/image';
import Link from 'next/link';

import Tag from '@/components/bricks/Tag';
import type { IProject } from '@/content/projects';

enum ECardState {
  DEFAULT,
  HIGHLIGHTED,
  DIMMED,
}

const checkOverlap = (el1: DOMRect | null, el2: DOMRect | null): boolean => {
  if (!el1 || !el2) return false;

  return (
    el1.top < el2.bottom &&
    el1.bottom > el2.top &&
    el1.left < el2.right &&
    el1.right > el2.left
  );
};

const useIntersecting = (
  elementRef: RefObject<HTMLElement>,
  rootRef?: RefObject<HTMLElement>,
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkIntersection = () => {
      const elementRect = elementRef.current?.getBoundingClientRect();
      const viewportRect = rootRef?.current?.getBoundingClientRect();

      // Ensure both bounding rects are defined before checking overlap
      if (elementRect && viewportRect) {
        setIsIntersecting(checkOverlap(elementRect, viewportRect));
      } else {
        setIsIntersecting(false);
      }
    };

    window.addEventListener('scroll', checkIntersection);
    window.addEventListener('resize', checkIntersection);

    // Initial check
    checkIntersection();

    return () => {
      window.removeEventListener('scroll', checkIntersection);
      window.removeEventListener('resize', checkIntersection);
    };
  }, [elementRef, rootRef]);

  return isMobile ? isIntersecting : false;
};

const ProjectCard = ({ project }: { project: IProject }) => {
  const {
    title,
    coverImage,
    learnMoreHref,
    playHref,
    tags,
    description,
    isExternal,
  } = project;
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className={classNames(
        'group/card relative isolate flex h-full snap-center flex-col overflow-hidden border-2 border-black',
      )}
    >
      <div
        className={classNames(
          'absolute inset-0 z-10 flex items-center justify-center bg-white/80 font-bold',
          {
            'pointer-events-none opacity-0': learnMoreHref || playHref,
          },
        )}
      >
        Coming soon!
      </div>

      <div
        className={classNames(
          'flex w-full items-center justify-center overflow-hidden',
          {
            'blur-sm': !learnMoreHref && !playHref,
          },
        )}
      >
        <NextImage
          className={classNames('object-cover transition duration-300')}
          src={coverImage}
          alt={title}
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 300px, 200px"
          placeholder="blur"
        />
      </div>
      <div
        className={classNames('flex-1 border-t-2 border-black p-4', {
          'blur-sm': !learnMoreHref && !playHref,
        })}
      >
        <h3 className="mb-2 text-3xl font-bold">{title}</h3>
        <p className="mb-2 text-sm">{description}</p>
        <div className="mb-4 flex gap-1">
          {tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={playHref || '#'}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={classNames(
              'border-2 border-black bg-black px-6 py-1 text-white',
            )}
          >
            Play
          </Link>
          <Link
            href={learnMoreHref || '#'}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={classNames(
              'border-2 border-transparent bg-black/10 px-4 py-1',
            )}
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
