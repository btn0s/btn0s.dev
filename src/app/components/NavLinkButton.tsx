'use client';

import { ReactNode } from 'react';

import Link from 'next/link';

export interface INavLink {
  icon?: ReactNode;
  label: string;
  href: string;
  isExternal?: boolean;
}

const NavLinkButton = ({ icon, label, href, isExternal }: INavLink) => {
  return (
    <Link
      className="flex h-full items-center justify-center"
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <li className="group relative inline-flex h-[42px] w-[42px] items-center justify-center gap-1 font-bold active:shadow-inner sm:h-full sm:w-auto sm:px-6">
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100"></div>
        <div className="flex items-center justify-center gap-2 group-active:scale-[0.98]">
          {icon}
          <span className="sr-only sm:not-sr-only">{label}</span>
        </div>
      </li>
    </Link>
  );
};

export default NavLinkButton;
