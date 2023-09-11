'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { HiArrowDown, HiShieldCheck } from 'react-icons/hi';
import { Socket, io } from 'socket.io-client';

import { FullScreenMobileView } from '@/app/components/FullScreenMobileView';
import {
  EGameEvent,
  EMatchPhase,
  ERoundPhase,
  IGameState,
} from '@/content/play';
import { SERVER_URL } from '@/content/server';
import bangMenuBgImage from '@/images/321bang-menu-bg.png';

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
    <div className="flex h-full flex-col items-center justify-center">
      <div className="text-center text-6xl font-black uppercase">
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
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="flex flex-1 flex-col justify-between">
        <div className="py-12">
          <div className="text-center text-5xl font-black uppercase">
            321 Bang!
          </div>
          <p className="text-center">
            A multiplayer game where you have to shoot your friends before they
            shoot you.
          </p>
        </div>
        <div
          className="rounded-md border border-black/50 bg-gray-300 p-6 text-left text-xs shadow-lg backdrop-blur-md"
        >
          <p className="mb-2 font-black">How to play:</p>
          <ul className="space-y-1">
            <li>The first player to tap the button wins the round.</li>
            <li>The first player to win 3 rounds wins the game.</li>
          </ul>
        </div>
      </div>
      <div className="space-y-4">
        <button
          onClick={handleHostClick}
          className="block w-full rounded-md bg-black py-2 text-center text-3xl font-black text-white transition sm:hover:bg-[#dedede] sm:hover:text-black"
        >
          START
        </button>
        <Link
          href="/play/321bang/"
          className="block w-full rounded-md border border-2 border-black bg-white py-2 text-center text-3xl font-black transition sm:hover:bg-[#dedede] sm:hover:text-black"
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
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="flex items-center justify-between">
        <Link
          href="/play/321bang/?p=true"
          className="text-fit block rounded-md border border-black bg-white px-4 py-2 text-center font-black transition sm:hover:bg-[#dedede] sm:hover:text-black"
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

      <div className="flex h-full w-full flex-1 flex-col items-center justify-center rounded-md border border-black/50 bg-gray-200 p-8">
        <div className="mb-6 text-4xl font-black">HOW TO PLAY</div>
        <div className="text-center">
          The first player to tap the button <br /> wins the round.
        </div>
        <div className="text-center">
          The first player to win 3 rounds <br /> wins the game.
        </div>
      </div>

      <div className="space-y-4 text-center">
        <button
          onClick={handleReadyClick}
          className="relative isolate block flex h-[48px] w-full items-center justify-center gap-1 overflow-hidden rounded-md bg-black py-2 text-center text-3xl font-black text-white transition sm:hover:bg-[#dedede] sm:hover:text-black"
          disabled={myPlayerState?.isReady}
        >
          {myPlayerState?.isReady && <HiShieldCheck />}
          <span>READY</span>
          {gameState.currentTimerDuration > 0 && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-white text-black"
            >
              Starting in...
              <span>{gameState.currentTimerDuration}</span>
            </div>
          )}
        </button>
        <div className="mx-auto flex w-fit items-center justify-center gap-4 rounded-full border border-black/50 bg-white px-4 py-1 py-2 text-xs">
          <HiArrowDown className="sm:hidden" />
          <div>share the URL with a friend to invite them</div>
          <HiArrowDown className="sm:hidden" />
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
    <div className="flex h-full w-full flex-col gap-6">
      <div className="flex items-center justify-center gap-4">
        <div
          className="flex aspect-square w-[42px] items-center justify-center rounded-md bg-blue-300 font-bold"
        >
          {myPlayerState?.roundsWon}
        </div>
        <div
          className="flex aspect-square w-[42px] items-center justify-center rounded-md bg-red-300 font-bold"
        >
          {otherPlayerState?.roundsWon}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-6">
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex w-full flex-1 items-center justify-center rounded-md border border-black/50 bg-gray-200">
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
        <div className="relative h-[48px]">
          {gameState.roundPhase === ERoundPhase.PLAY &&
            gameState.currentTimerDuration <= 0 && (
              <button
                onClick={handleBangClick}
                className="relative isolate block flex h-[48px] w-full items-center justify-center gap-1 overflow-hidden rounded-md bg-black py-2 text-center text-3xl font-black text-white transition sm:hover:bg-[#dedede] sm:hover:text-black"
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
    <div className="flex h-full w-full flex-col items-center justify-between gap-4 text-center">
      <div
        className="flex items-center justify-center gap-2 text-lg font-black uppercase"
      >
        <div
          className="flex aspect-square w-[42px] items-center justify-center rounded-md bg-blue-300 font-bold"
        >
          {myPlayerState?.roundsWon}
        </div>
        <div>game over</div>
        <div
          className="flex aspect-square w-[42px] items-center justify-center rounded-md bg-red-300 font-bold"
        >
          {otherPlayerState?.roundsWon}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center gap-4"></div>
        <div className="text-6xl font-black uppercase">
          {myPlayerState?.roundsWon > otherPlayerState?.roundsWon
            ? 'fastest gun in the west'
            : 'better off dead'}
        </div>
      </div>
      <Link
        href="/play/321bang/?p=true"
        className="relative isolate block flex h-[48px] w-full items-center justify-center gap-1 overflow-hidden rounded-md bg-black py-2 text-center text-3xl font-black text-white transition sm:hover:bg-[#dedede] sm:hover:text-black"
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
      <AnimatePresence mode="wait">
        {gameState?.matchPhase === EMatchPhase.LOBBY && (
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LobbyMenuView />
          </motion.div>
        )}
        {gameState?.matchPhase === EMatchPhase.PLAY && (
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PlayView />
          </motion.div>
        )}
        {gameState?.matchPhase === EMatchPhase.COMPLETE && (
          <motion.div
            className="h-full w-full"
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
      className="fixed fixed inset-0 inset-0 z-10 flex h-[100svh] w-[100vw] flex-col bg-white sm:p-12"
    >
      <FullScreenMobileView>
        <Image
          src={bangMenuBgImage}
          alt="bang"
          className="absolute inset-0 z-[-1] h-full w-full object-cover"
        />

        <AnimatePresence mode="wait">
          {activeView === EGameView.LOADING && (
            <motion.div
              className="z-10 h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingView />
            </motion.div>
          )}
          {activeView === EGameView.MAIN_MENU && (
            <motion.div
              className="z-10 h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MainMenuView />
            </motion.div>
          )}
          {sessionId && activeView === EGameView.GAMEPLAY && (
            <div className="z-10 h-full w-full">
              <GameplayView id={sessionId} />
            </div>
          )}
        </AnimatePresence>
      </FullScreenMobileView>
    </div>
  );
};

export default Game;
