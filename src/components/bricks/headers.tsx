import type { FC, PropsWithChildren } from 'react';

import classNames from 'classnames';

type HeaderComponent = FC<
  PropsWithChildren<{
    className?: string;
  }>
>;

export const PageTitle: HeaderComponent = ({ className, children }) => (
  <h1
    className={classNames(
      className,
      'text-3xl font-bold !leading-[1.5] sm:text-5xl',
    )}
  >
    {children}
  </h1>
);

export const PageSubtitle: HeaderComponent = ({ className, children }) => (
  <h2
    className={classNames(
      className,
      'text-2xl !leading-[1.5] text-gray-600 sm:text-4xl',
    )}
  >
    {children}
  </h2>
);

export const SectionTitle: HeaderComponent = ({ className, children }) => (
  <h3
    className={classNames(
      className,
      'text-xl font-bold !leading-[1.5] sm:text-2xl',
    )}
  >
    {children}
  </h3>
);

export const SubsectionTitle: HeaderComponent = ({ className, children }) => (
  <h4
    className={classNames(
      className,
      'font-bold font-bold sm:text-xl sm:font-normal',
    )}
  >
    {children}
  </h4>
);
