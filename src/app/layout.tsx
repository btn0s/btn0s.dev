import NavLinkButton, { INavLink } from "@/app/components/NavLinkButton";

import Providers from "@/app/providers";

import Head from "next/head";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { IoGameController } from "react-icons/io5";
import "../styles/global.css";

const NAV_LINKS: INavLink[] = [
  {
    icon: <IoGameController />,
    label: "play",
    href: "/games",
  },
  {
    icon: <FaGithub />,
    label: "github",
    href: "https://github.com/btn0s",
    isExternal: true,
  },
];

const SiteNav = () => {
  return (
    <header className="fixed z-10 w-full bg-white py-4">
      <div className="max-w-[1080px] mx-auto flex justify-between px-6">
        <Link
          href="/"
          className="flex h-[42px] items-center justify-center rounded-md bg-black px-4 text-xl font-bold text-white"
        >
          btn0s
        </Link>
        <nav>
          <ul className="flex gap-2">
            {NAV_LINKS.map(({ icon, label, href, isExternal }) => (
              <NavLinkButton
                key={href}
                href={href}
                icon={icon}
                label={label}
                isExternal={isExternal}
              />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,900;1,400;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Providers>
          <SiteNav />
          <main className="pt-12">{children}</main>
          <footer className="bg-white px-6 py-4 text-center">
            <Link
              className="flex items-center justify-center gap-2 underline opacity-30"
              href="https://github.com/btn0s/.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              view this site on Github
              <HiExternalLink className="opacity-50" />
            </Link>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
