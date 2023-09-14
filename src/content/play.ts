import { EProjectType, IProject } from '@/content/projects';
import bangCoverImage from '@/images/321bang-cover.png';
import comingSoonCoverImg from '@/images/coming-soon-cover.png';

export const PLAY_PAGE_LINKS: IProject[] = [
  {
    title: '3, 2, 1... BANG!',
    description: 'A simple multiplayer test of reaction speed.',
    learnMoreHref: '/play/321bang',
    playHref: '/play/321bang?p=true',
    coverImage: bangCoverImage,
    type: EProjectType.GAME,
  },
  {
    title: 'BANG BANG',
    description: 'Sequel to the hit game 3..2..1.. BANG!',
    coverImage: comingSoonCoverImg,
    type: EProjectType.GAME,
  },
  {
    title: '[Project Echelon]',
    description: 'Asymmetrical multiplayer game of cat and mouse.',
    coverImage: comingSoonCoverImg,
    type: EProjectType.GAME,
  },
];

export enum EGameEvent {
  UPDATE_GAME_STATE = 'UPDATE_GAME_STATE',
  PLAYER_READY = 'PLAYER_READY',
  PLAYER_SCORED = 'PLAYER_SCORED',
}

export enum EMatchPhase {
  LOBBY = 'LOBBY',
  PLAY = 'PLAY',
  COMPLETE = 'COMPLETE',
}

export enum ERoundPhase {
  STARTING = 'STARTING',
  PRE_PLAY = 'PRE_PLAY',
  PLAY = 'PLAY',
  POST_PLAY = 'POST_PLAY',
  ENDING = 'ENDING',
}

export interface IGameRules {
  roundsToWinMatch: number;
  scoreToWinRound: number;
  maxPlayers: number;
  minPlayers: number;
  timerDurations: {
    lobby: number;
    round: {
      prePlay: number;
      play: number;
      postPlay: number;
    };
    default: number;
  };
}

export interface IPlayerState {
  id: string;
  roundScore: number;
  roundsWon: number;
  isReady: boolean;
}

export interface IGameState {
  rules: IGameRules;
  matchPhase: EMatchPhase;
  roundPhase: ERoundPhase;
  players: IPlayerState[];
  currentTimerDuration: number;
  roundWinner: IPlayerState | null;
}
