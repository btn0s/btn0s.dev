import { EProjectType, IProject } from '@/content/projects';
import bangCoverImage from '@/images/321bang.png';

export const PLAY_PAGE_LINKS: IProject[] = [
  {
    title: '3, 2, 1... BANG!',
    description: 'A simple multiplayer test of reaction speed.',
    href: '/play/321bang',
    coverImage: bangCoverImage,
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
}
