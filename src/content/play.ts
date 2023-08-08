import { EProjectType, IProject } from '@/content/projects';
import bangCoverImage from '@/images/321bang.png';

export enum IMatchPhase {
  WAITING = 'WAITING',
  COUNTDOWN = 'COUNTDOWN',
  PAUSE = 'PAUSE',
  BANG = 'BANG',
  ROUND_COMPLETE = 'ROUND_COMPLETE',
  MATCH_COMPLETE = 'MATCH_COMPLETE',
}

export const PLAY_PAGE_LINKS: IProject[] = [
  {
    title: '3, 2, 1... BANG!',
    description: 'A simple multiplayer test of reaction speed.',
    href: '/play/321bang',
    coverImage: bangCoverImage,
    type: EProjectType.GAME,
  },
];
