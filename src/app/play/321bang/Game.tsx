'use client';

import { FullScreenMobileView } from '@/app/components/FullScreenMobileView';
import {
  EGameEvent,
  EMatchPhase,
  ERoundPhase,
  IGameState,
} from '@/content/play';
import bangCoverImage from '@/images/321bang.png';

import waitingForPlayersImg from '@/images/waiting-for-players.webp';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { HiArrowDown, HiArrowUp, HiShieldCheck } from 'react-icons/hi';
import { io, Socket } from 'socket.io-client';

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
    <FullScreenMobileView>
      <div className="h-full flex flex-col justify-center items-center">
        Loading...
      </div>
    </FullScreenMobileView>
  );
};

const MainMenuView = () => {
  const router = useRouter();

  const createGameSession = async () => {
    const sessionPayload = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/games/321bang/sessions`,
      {
        method: 'POST',
      },
    );
    const sessionPayloadJSON = await sessionPayload.json();
    return sessionPayloadJSON.sessionId;
  };

  const handleHostClick = () => {
    createGameSession().then((sessionId) => {
      router.push(`/play/321bang/?sid=${sessionId}`);
    });
  };

  return (
    <FullScreenMobileView>
      <div className={'flex flex-col justify-between h-full pb-12'}>
        <Image
          src={bangCoverImage}
          alt={'321 Bang!'}
          className={'border border-black/50 rounded-md'}
        />
        <div className={'flex-1 text-left py-6 space-y-2'}>
          <h1 className={'text-2xl font-black'}>321 Bang!</h1>
          <p className={''}>
            A multiplayer game where you have to shoot your friends before they
            shoot you.
          </p>
          <p className={'font-black'}>How to play:</p>
          <p className={'text-sm'}>
            The first player to tap the button wins the round.
          </p>
          <p className={'text-sm'}>
            The first player to win 3 rounds wins the game.
          </p>
        </div>
        <div className={'space-y-4'}>
          <button
            onClick={handleHostClick}
            className={
              'block text-center py-2 w-full rounded-md bg-black text-3xl text-white font-black transition sm:hover:bg-[#dedede] sm:hover:text-black'
            }
          >
            HOST GAME
          </button>
          <Link
            href={'/play/321bang/'}
            className={
              'block text-center py-2 w-full bg-black/50 text-3xl rounded-md text-white font-black transition sm:hover:bg-[#dedede] sm:hover:text-black'
            }
          >
            QUIT
          </Link>
        </div>
      </div>
    </FullScreenMobileView>
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
    <FullScreenMobileView>
      <div className="flex w-full h-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            className="inline-flex h-[42px] w-[42px] items-center justify-center px-12 gap-1 rounded-md bg-gray-300 font-bold hover:bg-gray-300 sm:w-auto sm:px-6"
            href={'/play/321bang/?p=true'}
          >
            QUIT
          </Link>
          <div className="flex flex-col items-center justify-center space-y-2 font-bold text-lg">
            {`${
              gameState.players.length < gameState.rules.minPlayers
                ? 'Waiting for players... '
                : ''
            }${gameState?.players.length}/${gameState?.rules.minPlayers}`}
          </div>
        </div>
        <div className={'flex-1 flex gap-6 flex-col justify-between'}>
          <div className={'flex flex-col flex-1 gap-6'}>
            <div className="w-full bg-gray-200 border-black/50 border rounded-md flex-1">
              {myPlayerState?.isReady ? (
                <Image
                  src={waitingForPlayersImg}
                  alt={'waiting for players'}
                  className={'h-full w-full object-cover'}
                />
              ) : (
                <Image
                  src={waitingForPlayersImg}
                  alt={'waiting for players'}
                  className={'h-full w-full object-cover'}
                />
              )}
            </div>
          </div>
          <div className={'relative h-[48px]'}>
            <div className="w-full hidden sm:flex text-xs flex flex-col gap-1 pb-4 justify-center items-center">
              <div>
                share the URL with your friends to invite them to the game
              </div>
            </div>
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
            <div className="w-full sm:hidden text-xs flex flex-col gap-1 py-2 justify-center items-center">
              <div>
                share the URL with your friends to invite them to the game
              </div>
              <HiArrowDown />
            </div>
          </div>
        </div>
      </div>
    </FullScreenMobileView>
  );
};
const PlayView = () => {
  const gameState = useContext(gameStateContext);
  const { myPlayerState, otherPlayerState } = usePlayerStates(gameState);

  const [_, setMyScore] = useState(0);
  const [didWin, setDidWin] = useState(false);

  useEffect(() => {
    setMyScore((prev) => {
      if (myPlayerState && myPlayerState.roundsWon > prev) {
        setDidWin(true);
      } else {
        setDidWin(false);
      }
      return myPlayerState?.roundsWon || 0;
    });
  }, [myPlayerState]);

  useEffect(() => {
    if (gameState?.roundPhase === ERoundPhase.STARTING) {
      setDidWin(false);
    }
  }, [gameState?.roundPhase]);

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
    <FullScreenMobileView>
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
                  <div className="text-3xl font-black">BANG!</div>
                )}
              {gameState.roundPhase === ERoundPhase.POST_PLAY && (
                <div className="text-3xl font-black">
                  {didWin ? 'YOU WIN!' : 'YOU LOSE!'}
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
                  <span>DRAW</span>
                </button>
              )}
          </div>
        </div>
      </div>
    </FullScreenMobileView>
  );
};
const MatchCompleteView = () => {
  const gameState = useContext(gameStateContext);
  const { myPlayerState, otherPlayerState } = usePlayerStates(gameState);

  if (!gameState || !myPlayerState || !otherPlayerState) {
    return null;
  }

  return (
    <FullScreenMobileView>
      <div className="flex w-full text-center h-full flex-col gap-4 justify-between items-center">
        <div className={'text-lg font-black uppercase'}>game over</div>
        <div className="flex flex-col gap-4">
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
          <div className={'text-5xl font-black uppercase'}>
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
    </FullScreenMobileView>
  );
};

const GameplayView = ({ id }: { id: string }) => {
  const socketRef = useRef<Socket | null>(null);

  const [gameState, setGameState] = useState<IGameState | null>();

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
        {
          path: '/games/321bang/play/socket.io',
          transports: ['websocket'],
          query: {
            sessionId: id,
          },
        },
      );
    }

    const socket = socketRef.current;

    socket.on(EGameEvent.UPDATE_GAME_STATE, (state) => {
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
      {gameState?.matchPhase === EMatchPhase.LOBBY && <LobbyMenuView />}
      {gameState?.matchPhase === EMatchPhase.PLAY && <PlayView />}
      {gameState?.matchPhase === EMatchPhase.COMPLETE && <MatchCompleteView />}
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
        'bg-white relative h-[100svh] w-[100vw] fixed sm:p-12 flex flex-col inset-0 z-10'
      }
    >
      {activeView === EGameView.LOADING && <LoadingView />}
      {activeView === EGameView.MAIN_MENU && <MainMenuView />}
      {sessionId && activeView === EGameView.GAMEPLAY && (
        <GameplayView id={sessionId} />
      )}
    </div>
  );
};

export default Game;
