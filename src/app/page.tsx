import { Metadata } from 'next';

import HomePage from '@/app/components/pages/HomePage';

export const metadata: Metadata = {
  title: 'btn0s.dev',
  description: 'i do some things around the web, this is a home for them',
  openGraph: {
    url: 'https://btn0s.dev',
    siteName: 'btn0s.dev',
    description: 'i do some things around the web, this is a home for them',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'btn0s.dev',
      },
    ],
  },
  twitter: {
    title: 'btn0s.dev',
    description: 'i do some things around the web, this is a home for them',
    card: 'summary_large_image',
  },
};

const Home = () => <HomePage></HomePage>;

export default Home;
