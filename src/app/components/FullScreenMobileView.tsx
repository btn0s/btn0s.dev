import { FC, PropsWithChildren } from 'react';

export const FullScreenMobileView: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={
        'h-[100svh] sm:max-h-[80vh] sm:max-w-[480px] sm:mx-auto sm:border p-6 sm:border-black/50 sm:mt-12 sm:rounded-md sm:overflow-hidden sm:shadow-xl sm:backdrop-filter sm:backdrop-blur-sm sm:px-6 sm:py-12 sm:space-y-4'
      }
    >
      {children}
    </div>
  );
};
