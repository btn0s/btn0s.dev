'use client'

import useHoverHighlight from '@/hooks/useHoverHighlight'
import useHoverTilt from '@/hooks/useHoverTilt'
import { useIsMobile } from '@nextui-org/use-is-mobile'
import classNames from 'classnames'
import NextImage from 'next/image'
import Link from 'next/link'
import type { MutableRefObject, RefObject } from 'react'
import { useEffect, useRef, useState } from 'react'
import { HiExternalLink } from 'react-icons/hi'

import Tag from '@/components/bricks/Tag'
import type { IProject } from '@/content/projects'
import useImageLightness from '@/hooks/useImageLightness'

enum ECardState {
  DEFAULT,
  HIGHLIGHTED,
  DIMMED,
}

const checkOverlap = (el1: DOMRect | null, el2: DOMRect | null): boolean => {
  if (!el1 || !el2) return false

  return (
    el1.top < el2.bottom &&
    el1.bottom > el2.top &&
    el1.left < el2.right &&
    el1.right > el2.left
  )
}

const useIntersecting = (
  elementRef: RefObject<HTMLElement>,
  rootRef?: RefObject<HTMLElement>,
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const checkIntersection = () => {
      const elementRect = elementRef.current?.getBoundingClientRect()
      const viewportRect = rootRef?.current?.getBoundingClientRect()

      // Ensure both bounding rects are defined before checking overlap
      if (elementRect && viewportRect) {
        setIsIntersecting(checkOverlap(elementRect, viewportRect))
      } else {
        setIsIntersecting(false)
      }
    }

    window.addEventListener('scroll', checkIntersection)
    window.addEventListener('resize', checkIntersection)

    // Initial check
    checkIntersection()

    return () => {
      window.removeEventListener('scroll', checkIntersection)
      window.removeEventListener('resize', checkIntersection)
    }
  }, [elementRef, rootRef])

  return isMobile ? isIntersecting : false
}

const ProjectCard = ({
  project,
  overlapTargetRef,
  cardsHovered,
  onOverlapStart,
  onOverlapEnd,
}: {
  project: IProject
  overlapTargetRef?: MutableRefObject<null>
  cardsHovered?: string[]
  onOverlapStart?: (title: string) => void
  onOverlapEnd?: (title: string) => void
}) => {
  const { title, coverImage, href, tags, description, isExternal } = project
  const [cardState, setCardState] = useState<ECardState>(ECardState.DEFAULT)
  const imageLightness = useImageLightness(coverImage.src)
  const cardRef = useRef(null)
  const isInView = useIntersecting(cardRef, overlapTargetRef)
  const isMobile = useIsMobile()

  useHoverHighlight(cardRef)
  useHoverTilt(cardRef)

  useEffect(() => {
    if (isInView) {
      onOverlapStart && onOverlapStart(title)
    } else {
      onOverlapEnd && onOverlapEnd(title)
    }
  }, [isInView])

  useEffect(() => {
    if (!cardsHovered) return

    // if any card is hovered, dim all other cards
    if (cardsHovered.length > 0) {
      setCardState(
        cardsHovered.includes(title)
          ? ECardState.HIGHLIGHTED
          : ECardState.DIMMED,
      )
    } else {
      setCardState(ECardState.DEFAULT)
    }
  }, [cardsHovered])

  const handelMouseEnter = () => {
    if (isMobile) return
    setCardState(ECardState.HIGHLIGHTED)
    onOverlapStart && onOverlapStart(title)
  }

  const handelMouseLeave = () => {
    if (isMobile) return
    setCardState(ECardState.DEFAULT)
    onOverlapEnd && onOverlapEnd(title)
  }

  return (
    <div
      ref={cardRef}
      className={classNames(
        'snap-center group/card relative isolate flex flex-col overflow-hidden rounded-md border border-black/50 bg-white transition',
        {
          '!opacity-100 shadow-lg': cardState === ECardState.HIGHLIGHTED,
          'opacity-80 grayscale': cardState === ECardState.DIMMED,
        },
      )}
      onMouseEnter={handelMouseEnter}
      onMouseLeave={handelMouseLeave}
    >
      <Link
        href={href}
        className="absolute inset-0 z-10 flex h-full w-full items-center justify-center opacity-0"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        <span className="sr-only">visit</span>
      </Link>
      <div className="flex w-full items-center justify-center overflow-hidden bg-gray-200 rounded-t-md">
        <NextImage
          className={classNames(
            'aspect-video object-cover transition duration-300',
            {
              'scale-105': cardState === ECardState.HIGHLIGHTED,
            },
          )}
          src={coverImage}
          alt={title}
          sizes="50vw"
          placeholder="blur"
        />
      </div>
      <div className="flex-1 p-4 border-t border-black/50">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="mb-2 text-sm text-gray-600">{description}</p>
        <div className="flex gap-1">
          {tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </div>
        {imageLightness !== null && (
          <div
            className={classNames(
              'absolute right-4 top-4 opacity-0 gap-2 translate-y-1 transition flex items-center bg-white/10 rounded-full border px-4 py-1 text-xs backdrop-blur-lg',
              imageLightness < 0.5
                ? 'text-black border-black/50'
                : 'text-white border-white/50',
              {
                'translate-y-0 opacity-100':
                  cardState === ECardState.HIGHLIGHTED,
              },
            )}
          >
            View Project
            {isExternal && <HiExternalLink />}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
