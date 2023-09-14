import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { IoGameController } from 'react-icons/io5';

import NavLinkButton, { INavLink } from '@/app/components/NavLinkButton';

const NAV_LINKS: INavLink[] = [
  {
    icon: <IoGameController />,
    label: 'play',
    href: '/play',
  },
  {
    icon: <FaGithub />,
    label: 'github',
    href: 'https://github.com/btn0s',
    isExternal: true,
  },
];

const SiteNav = () => {
  return (
    <header className="flex h-[50px] w-full justify-between border-2 border-[#1C1C1C] bg-[#FAF0E6]">
      <div className="border-r-2 border-[#1C1C1C] bg-[#EFDECC]">
        <Link
          href="/"
          className="group flex h-[42px] items-center justify-center px-6 text-xl font-bold active:shadow-inner"
        >
          <span className="group-active:scale-[0.98]">btn0s.dev</span>
        </Link>
      </div>
      <nav className="flex">
        <ul className="flex divide-x-2 divide-[#1C1C1C] border-l-2 border-[#1C1C1C]">
          {NAV_LINKS.map(({ icon, label, href, isExternal }) => (
            <div key={href} className="bg-[#EFDECC]">
              <NavLinkButton
                href={href}
                icon={icon}
                label={label}
                isExternal={isExternal}
              />
            </div>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default SiteNav;
