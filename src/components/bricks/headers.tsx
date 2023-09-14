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
      'text-2xl font-bold !leading-[1.2] [text-wrap:balance] sm:text-6xl',
    )}
  >
    {children}
  </h1>
);

export const PageSubtitle: HeaderComponent = ({ className, children }) => (
  <h2
    className={classNames(
      className,
      'text-2xl !leading-[1.5] text-gray-600 [text-wrap:balance] sm:text-4xl',
    )}
  >
    {children}
  </h2>
);

export const SectionTitle: HeaderComponent = ({ className, children }) => (
  <h3
    className={classNames(
      className,
      'text-xl font-bold !leading-[1.5] [text-wrap:balance] sm:text-2xl',
    )}
  >
    {children}
  </h3>
);

export const SubsectionTitle: HeaderComponent = ({ className, children }) => (
  <h4
    className={classNames(
      className,
      'font-bold font-bold [text-wrap:balance] sm:text-xl sm:font-normal',
    )}
  >
    {children}
  </h4>
);
