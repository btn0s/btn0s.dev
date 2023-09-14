import type { StaticImageData } from 'next/image';

import { ETag } from '@/content/tags';

import bbCoverImg from '../images/bb-cover.jpeg';
import thCoverImg from '../images/th-cover.png';

export enum EProjectType {
  GAME = 'game',
  WEB = 'web',
  WRITING = 'writing',
  EXPERIMENT = 'experiment',
}

export interface IProject {
  coverImage: StaticImageData;
  title: string;
  description: string;
  learnMoreHref?: string;
  playHref?: string;
  isExternal?: boolean;
  tags?: ETag[];
  type: EProjectType;
}

export const FEATURED_PROJECTS: IProject[] = [
  {
    title: 'thinkhuman.co',
    description: 'A digital solutions cooperative.',
    learnMoreHref: 'https://thinkhuman.co',
    coverImage: thCoverImg,
    tags: [ETag.NEXTJS, ETag.TAILWINDCSS],
    isExternal: true,
    type: EProjectType.WEB,
  },
  {
    title: 'playbackbone.com',
    description: 'Mobile gaming, perfected.',
    learnMoreHref: 'https://playbackbone.com',
    coverImage: bbCoverImg,
    tags: [ETag.NEXTJS, ETag.TAILWINDCSS, ETag.SHOPIFY],
    isExternal: true,
    type: EProjectType.WEB,
  },
];
