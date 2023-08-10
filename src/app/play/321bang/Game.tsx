'use client';

import { SERVER_URL } from '@/content/server';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { HiArrowDown, HiShieldCheck } from 'react-icons/hi';
import { io, Socket } from 'socket.io-client';
import { FullScreenMobileView } from '@/app/components/FullScreenMobileView';
import {
  EGameEvent,
  EMatchPhase,
  ERoundPhase,
  IGameState,
} from '@/content/play';
import { AnimatePresence, motion } from 'framer-motion';

import bangCoverImage from '@/images/321bang-cover.png';
import bangMenuBgImage from '@/images/321bang-menu-bg.png';
import waitingForPlayersImg from '@/images/waiting-for-players.webp';

enum EGameView {
  MAIN_MENU,
  GAMEPLAY,
  LOADING,
}

type GameStateWithSocket = IGameState & {
  socket: Socket;
};

const gameStateContext = createContext<GameStateWithSocket | null>(null);

const usePlayerStates = (gameState: GameStateWithSocket | null) => {
  if (!gameState) {
    return { myPlayerState: undefined, otherPlayerState: undefined };
  }

  const myPlayerState = gameState.players.find(
    (player) => player.id === gameState.socket.id,
  );

  const otherPlayerState = gameState.players.find(
    (player) => player.id !== gameState.socket.id,
  );

  return { myPlayerState, otherPlayerState };
};

const LoadingView = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className={'text-6xl font-black uppercase text-center'}>
        Loading...
      </div>
    </div>
  );
};

const MainMenuView = () => {
  const router = useRouter();

  const createGameSession = async () => {
    const sessionPayload = await fetch(`${SERVER_URL}/games/321bang/sessions`, {
      method: 'POST',
    });
    const sessionPayloadJSON = await sessionPayload.json();
    return sessionPayloadJSON.sessionId;
  };

  const handleHostClick = () => {
    createGameSession().then((sessionId) => {
      router.push(`/play/321bang/?sid=${sessionId}`);
    });
  };

  return (
    <div className={'flex flex-col gap-6 justify-between h-full'}>
      <div className="flex flex-col justify-between flex-1">
        <div className="py-12">
          <div className="text-5xl font-black text-center uppercase">
            321 Bang!
          </div>
          <p className={'text-center'}>
            A multiplayer game where you have to shoot your friends before they
            shoot you.
          </p>
        </div>
        <div
          className={
            'text-left text-xs p-6 rounded-md shadow-lg bg-gray-300 backdrop-blur-md border border-black/50'
          }
        >
          <p className={'font-black mb-2'}>How to play:</p>
          <ul className={'space-y-1'}>
            <li>The first player to tap the button wins the round.</li>
            <li>The first player to win 3 rounds wins the game.</li>
          </ul>
        </div>
      </div>
      <div className={'space-y-4'}>
        <button
          onClick={handleHostClick}
          className={
            'block text-center py-2 w-full rounded-md bg-black text-3xl text-white font-black transition sm:hover:bg-[#dedede] sm:hover:text-black'
          }
        >
          START
        </button>
        <Link
          href={'/play/321bang/'}
          className={
            'block text-center py-2 w-full bg-white border border-2 border-black text-3xl rounded-md font-black transition sm:hover:bg-[#dedede] sm:hover:text-black'
          }
        >
          QUIT
        </Link>
      </div>
    </div>
  );
};
const LobbyMenuView = () => {
  const gameState = useContext(gameStateContext);

  const { myPlayerState } = usePlayerStates(gameState);

  function handleReadyClick() {
    gameState?.socket.emit(EGameEvent.PLAYER_READY, myPlayerState?.id);
  }

  if (!gameState) {
    return null;
  }

  return (
    <div className={'flex flex-col gap-6 justify-between h-full'}>
      <div className="flex items-center justify-between">
        <Link
          href={'/play/321bang/?p=true'}
          className={
            'block text-center py-2 px-4 bg-white border border-black text-fit rounded-md font-black transition sm:hover:bg-[#dedede] sm:hover:text-black'
          }
        >
          QUIT
        </Link>
        <div className="flex flex-col items-center justify-center space-y-2 font-bold">
          {`${
            gameState.players.length < gameState.rules.minPlayers
              ? 'Waiting for players... '
              : ''
          }${gameState?.players.length}/${gameState?.rules.minPlayers}`}
        </div>
      </div>

      <div className="w-full flex flex-col items-center p-8 justify-center h-full bg-gray-200 border-black/50 border rounded-md flex-1">
        <div className={'text-4xl font-black mb-6'}>HOW TO PLAY</div>
        <div className={'text-center'}>
          The first player to tap the button <br /> wins the round.
        </div>
        <div className={'text-center'}>
          The first player to win 3 rounds <br /> wins the game.
        </div>
      </div>

      <div className={'space-y-4 text-center'}>
        <button
          onClick={handleReadyClick}
          className={
            'block relative text-center gap-1 isolate overflow-hidden flex justify-center items-center h-[48px] py-2 w-full rounded-md bg-black text-3xl text-white font-black transition sm:hover:bg-[#dedede] sm:hover:text-black'
          }
          disabled={myPlayerState?.isReady}
        >
          {myPlayerState?.isReady && <HiShieldCheck />}
          <span>READY</span>
          {gameState.currentTimerDuration > 0 && (
            <div
              className={
                'absolute inset-0 z-10 flex text-black items-center bg-white justify-center gap-2'
              }
            >
              Starting in...
              <span>{gameState.currentTimerDuration}</span>
            </div>
          )}
        </button>
        <div className="rounded-full w-fit px-4 mx-auto py-1 bg-white border border-black/50 text-xs flex gap-4 py-2 justify-center items-center">
          <HiArrowDown className={'sm:hidden'} />
          <div>share the URL with a friend to invite them</div>
          <HiArrowDown className={'sm:hidden'} />
        </div>
      </div>
    </div>
  );
};
const PlayView = () => {
  const gameState = useContext(gameStateContext);
  const { myPlayerState, otherPlayerState } = usePlayerStates(gameState);

  function handleBangClick() {
    gameState?.socket.emit(EGameEvent.PLAYER_SCORED, myPlayerState?.id);
  }

  if (!gameState) {
    return null;
  }

  if (gameState?.roundPhase === ERoundPhase.STARTING) {
    return <LoadingView />;
  }

  return (
    <div className="flex w-full h-full flex-col gap-6">
      <div className="flex items-center justify-center gap-4">
        <div
          className={
            'bg-blue-300 font-bold aspect-square w-[42px] rounded-md flex justify-center items-center'
          }
        >
          {myPlayerState?.roundsWon}
        </div>
        <div
          className={
            'bg-red-300 font-bold aspect-square w-[42px] rounded-md flex justify-center items-center'
          }
        >
          {otherPlayerState?.roundsWon}
        </div>
      </div>
      <div className={'flex-1 flex gap-6 flex-col justify-between'}>
        <div className={'flex flex-col flex-1 gap-6'}>
          <div className="w-full bg-gray-200 border-black/50 flex justify-center items-center border rounded-md flex-1">
            {gameState.roundPhase === ERoundPhase.PRE_PLAY && (
              <div className="text-3xl font-black">
                {gameState.currentTimerDuration <= 3 &&
                  gameState.currentTimerDuration > 0 &&
                  gameState.currentTimerDuration}
                {gameState.currentTimerDuration > 3 && 'GET READY'}
              </div>
            )}
            {gameState.roundPhase === ERoundPhase.PLAY &&
              gameState.currentTimerDuration <= 0 && (
                <div className="text-3xl font-black">SHOOT</div>
              )}
            {gameState.roundPhase === ERoundPhase.POST_PLAY && (
              <div className="text-3xl font-black">
                {gameState.roundWinner?.id === myPlayerState?.id
                  ? 'YOU WIN!'
                  : 'YOU LOSE!'}
              </div>
            )}
          </div>
        </div>
        <div className={'relative h-[48px]'}>
          {gameState.roundPhase === ERoundPhase.PLAY &&
            gameState.currentTimerDuration <= 0 && (
              <button
                onClick={handleBangClick}
                className={
                  'block relative text-center gap-1 isolate overflow-hidden flex justify-center items-center h-[48px] py-2 w-full rounded-md bg-black text-3xl text-white font-black transition sm:hover:bg-[#dedede] sm:hover:text-black'
                }
              >
                <span>BANG</span>
              </button>
            )}
        </div>
      </div>
    </div>
  );
};
const MatchCompleteView = () => {
  const gameState = useContext(gameStateContext);
  const { myPlayerState, otherPlayerState } = usePlayerStates(gameState);

  if (!gameState || !myPlayerState || !otherPlayerState) {
    return null;
  }

  return (
    <div className="flex w-full text-center h-full flex-col gap-4 justify-between items-center">
      <div
        className={
          'text-lg font-black uppercase gap-2 flex justify-center items-center'
        }
      >
        <div
          className={
            'bg-blue-300 font-bold aspect-square w-[42px] rounded-md flex justify-center items-center'
          }
        >
          {myPlayerState?.roundsWon}
        </div>
        <div>game over</div>
        <div
          className={
            'bg-red-300 font-bold aspect-square w-[42px] rounded-md flex justify-center items-center'
          }
        >
          {otherPlayerState?.roundsWon}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-4"></div>
        <div className={'text-6xl font-black uppercase'}>
          {myPlayerState?.roundsWon > otherPlayerState?.roundsWon
            ? 'fastest gun in the west'
            : 'better off dead'}
        </div>
      </div>
      <Link
        href={'/play/321bang/?p=true'}
        className={
          'block relative text-center gap-1 isolate overflow-hidden flex justify-center items-center h-[48px] py-2 w-full rounded-md bg-black text-3xl text-white font-black transition sm:hover:bg-[#dedede] sm:hover:text-black'
        }
      >
        QUIT
      </Link>
    </div>
  );
};

const GameplayView = ({ id }: { id: string }) => {
  const socketRef = useRef<Socket | null>(null);

  const [gameState, setGameState] = useState<IGameState | null>();

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(SERVER_URL || 'http://localhost:3000', {
        path: '/games/321bang/play/socket.io',
        transports: ['websocket'],
        query: {
          sessionId: id,
        },
      });
    }

    const socket = socketRef.current;

    socket.on(EGameEvent.UPDATE_GAME_STATE, (state) => {
      console.log('UPDATE_GAME_STATE', state);
      setGameState(state);
    });

    return () => {
      // Disconnect the socket when the component is unmounted.
      socketRef.current?.disconnect();
    };
  }, [id]);

  return gameState && socketRef.current ? (
    <gameStateContext.Provider
      value={{ ...gameState, socket: socketRef.current }}
    >
      <AnimatePresence mode={'wait'}>
        {gameState?.matchPhase === EMatchPhase.LOBBY && (
          <motion.div
            className={'h-full w-full'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LobbyMenuView />
          </motion.div>
        )}
        {gameState?.matchPhase === EMatchPhase.PLAY && (
          <motion.div
            className={'h-full w-full'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PlayView />
          </motion.div>
        )}
        {gameState?.matchPhase === EMatchPhase.COMPLETE && (
          <motion.div
            className={'h-full w-full'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MatchCompleteView />
          </motion.div>
        )}
      </AnimatePresence>
    </gameStateContext.Provider>
  ) : null;
};

const Game = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sid') || undefined;

  const [activeView, setActiveView] = useState<EGameView>(EGameView.LOADING);

  useEffect(() => {
    if (sessionId) {
      setActiveView(EGameView.GAMEPLAY);
    } else {
      setActiveView(EGameView.MAIN_MENU);
    }
  }, [sessionId]);

  return (
    <div
      className={
        'bg-white fixed inset-0 h-[100svh] w-[100vw] fixed sm:p-12 flex flex-col inset-0 z-10'
      }
    >
      <FullScreenMobileView>
        <Image
          src={bangMenuBgImage}
          alt={'bang'}
          className={'absolute z-[-1] inset-0 w-full h-full object-cover'}
        />

        <AnimatePresence mode={'wait'}>
          {activeView === EGameView.LOADING && (
            <motion.div
              className="z-10 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingView />
            </motion.div>
          )}
          {activeView === EGameView.MAIN_MENU && (
            <motion.div
              className="z-10 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MainMenuView />
            </motion.div>
          )}
          {sessionId && activeView === EGameView.GAMEPLAY && (
            <div className="z-10 w-full h-full">
              <GameplayView id={sessionId} />
            </div>
          )}
        </AnimatePresence>
      </FullScreenMobileView>
    </div>
  );
};

export default Game;
