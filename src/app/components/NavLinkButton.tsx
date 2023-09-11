'use client';

import { ReactNode, useRef } from 'react';

import Link from 'next/link';

import useHoverHighlight from '@/hooks/useHoverHighlight';

export interface INavLink {
  icon?: ReactNode;
  label: string;
  href: string;
  isExternal?: boolean;
}

const NavLinkButton = ({ icon, label, href, isExternal }: INavLink) => {
  const ref = useRef<HTMLLIElement>(null);

  useHoverHighlight(ref);

  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <li
        ref={ref}
        className="inline-flex h-[42px] w-[42px] items-center justify-center gap-1 rounded-md bg-gray-300 font-bold hover:bg-gray-300 sm:w-auto sm:px-6"
      >
        {icon}
        <span className="sr-only sm:not-sr-only">{label}</span>
      </li>
    </Link>
  );
};

export default NavLinkButton;
