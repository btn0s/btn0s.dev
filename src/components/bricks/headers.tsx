import classNames from "classnames";
import type { FC, PropsWithChildren } from "react";

type HeaderComponent = FC<
  PropsWithChildren<{
    className?: string;
  }>
>;

export const PageTitle: HeaderComponent = ({ className, children }) => (
  <h1
    className={classNames(
      className,
      "!leading-[1.5] font-bold text-3xl sm:text-5xl",
    )}
  >
    {children}
  </h1>
);

export const PageSubtitle: HeaderComponent = ({ className, children }) => (
  <h2
    className={classNames(
      className,
      "!leading-[1.5] text-2xl sm:text-4xl text-gray-600",
    )}
  >
    {children}
  </h2>
);

export const SectionTitle: HeaderComponent = ({ className, children }) => (
  <h3
    className={classNames(
      className,
      "!leading-[1.5] font-bold text-xl sm:text-2xl",
    )}
  >
    {children}
  </h3>
);

export const SubsectionTitle: HeaderComponent = ({ className, children }) => (
  <h4
    className={classNames(
      className,
      "font-bold font-bold sm:font-normal sm:text-xl",
    )}
  >
    {children}
  </h4>
);
