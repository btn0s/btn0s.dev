import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';

type UseCenteredInViewPort = {
  isCentered: boolean;
  cardRef: React.RefObject<HTMLDivElement>;
  TopSentinel: ReactElement;
  BottomSentinel: ReactElement;
};

const useCenteredInViewport = (): UseCenteredInViewPort => {
  const [isCentered, setIsCentered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let topObserver: IntersectionObserver;
    let bottomObserver: IntersectionObserver;

    const handleIntersection = (
      [entry]: any,
      observer: IntersectionObserver,
    ) => {
      const isTopVisible =
        observer === topObserver
          ? entry.isIntersecting
          : topRef.current?.offsetParent !== null;
      const isBottomVisible =
        observer === bottomObserver
          ? entry.isIntersecting
          : bottomRef.current?.offsetParent !== null;

      setIsCentered(isTopVisible && isBottomVisible);
    };

    topObserver = new IntersectionObserver(handleIntersection, {
      rootMargin: '-50% 0px',
      threshold: [0],
    });

    bottomObserver = new IntersectionObserver(handleIntersection, {
      rootMargin: '50% 0px',
      threshold: [0],
    });

    if (topRef.current) topObserver.observe(topRef.current);
    if (bottomRef.current) bottomObserver.observe(bottomRef.current);

    return () => {
      if (topRef.current) topObserver.unobserve(topRef.current);
      if (bottomRef.current) bottomObserver.unobserve(bottomRef.current);
    };
  }, []);

  const TopSentinel = (
    <div ref={topRef} style={{ height: '1px', background: 'transparent' }} />
  );
  const BottomSentinel = (
    <div ref={bottomRef} style={{ height: '1px', background: 'transparent' }} />
  );

  return {
    isCentered,
    cardRef,
    TopSentinel,
    BottomSentinel,
  };
};

export default useCenteredInViewport;
