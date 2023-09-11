import { FC, PropsWithChildren } from 'react';

export const FullScreenMobileView: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="isolate w-full flex-1 p-6 pb-12 sm:mx-auto sm:max-w-[480px] sm:space-y-4 sm:overflow-hidden sm:rounded-md sm:border sm:border-black/50 sm:shadow-xl sm:backdrop-blur-sm sm:backdrop-filter"
    >
      {children}
    </div>
  );
};
