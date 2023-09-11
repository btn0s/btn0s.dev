import type { FC, PropsWithChildren } from 'react';

const Tag: FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <span
      {...props}
      className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
    >
      {children}
    </span>
  );
};

export default Tag;
