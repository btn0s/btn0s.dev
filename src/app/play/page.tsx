import { Metadata } from 'next';

import PlayPage from '@/app/components/pages/PlayPage';

export const metadata: Metadata = {
  title: 'play · btn0s.dev',
  description: "i make games sometimes, here's a collection of them",
  openGraph: {
    url: 'https://btn0s.dev',
    siteName: 'play · btn0s.dev',
    type: 'website',
    description: "i make games sometimes, here's a collection of them",
    images: [
      {
        url: '/play-og.png',
        width: 1200,
        height: 630,
        alt: 'play · btn0s.dev',
      },
    ],
  },
  twitter: {
    title: 'play · btn0s.dev',
    description: "i make games sometimes, here's a collection of them",
    card: 'summary_large_image',
  },
};

const Play = () => <PlayPage></PlayPage>;

export default Play;
