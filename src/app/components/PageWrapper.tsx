'use client';

import { FC, MutableRefObject, PropsWithChildren } from 'react';

import SiteNav from '@/app/components/SiteNav';

const PageWrapper: FC<
  PropsWithChildren<{
    hoverTargetRef: MutableRefObject<HTMLDivElement | null>;
  }>
> = ({ children, hoverTargetRef }) => {
  return (
    <div className="fixed inset-0 p-4 sm:p-6">
      <div
        ref={hoverTargetRef}
        className="relative mx-auto flex h-full w-full max-w-[1200px]"
      >
        <div className="absolute left-2 top-2 h-full w-full bg-black/10 sm:left-4 sm:top-4"></div>
        <div className="relative flex w-full flex-col justify-between overflow-hidden bg-[#FFF9F2]">
          <SiteNav />

          <div className="flex-1 overflow-auto border-l-2 border-r-2 border-[#1C1C1C]">
            {children}
          </div>

          <SiteNav />
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
