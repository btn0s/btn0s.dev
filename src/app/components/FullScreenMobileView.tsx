import { FC, PropsWithChildren } from 'react';

export const FullScreenMobileView: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={
        'flex-1 relative sm:max-w-[480px] w-full sm:mx-auto sm:border p-6 pb-12 sm:border-black/50 sm:rounded-md sm:overflow-hidden sm:shadow-xl sm:backdrop-filter sm:backdrop-blur-sm sm:space-y-4'
      }
    >
      {children}
    </div>
  );
};
