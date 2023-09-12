import { FC, PropsWithChildren } from 'react';

import Link from 'next/link';
import { HiExternalLink } from 'react-icons/hi';

const HeroLink: FC<
  PropsWithChildren<{ href: string; backgroundColor?: string }>
> = ({ href, backgroundColor, children }) => (
  <Link
    className="group relative isolate inline-flex items-center px-2 text-black transition hover:text-white hover:no-underline active:scale-[0.98]"
    href={href}
    target={href.startsWith('/') ? undefined : '_blank'}
    rel={
      href.startsWith('/') ? undefined : 'noopener noreferrer nofollow external'
    }
    style={{
      backgroundColor: backgroundColor
        ? `${backgroundColor}${50}`
        : '#1f293750',
    }}
  >
    <span className="gap flex gap-2">
      {children}
      <HiExternalLink className="opacity-50" />
    </span>
    <div
      className="absolute inset-0 z-[-1] origin-right scale-x-0 transition duration-300 ease-soft-spring group-hover:origin-left sm:group-hover:scale-x-100"
      style={{
        backgroundColor: backgroundColor ? backgroundColor : '#1f2937',
      }}
    ></div>
  </Link>
);

export default HeroLink;
