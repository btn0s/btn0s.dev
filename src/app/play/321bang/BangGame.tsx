'use client';

import { FullScreenMobileView } from '@/app/components/FullScreenMobileView';
import { GameSession } from '@/app/play/321bang/GameSession';
import { IMatchPhase } from '@/content/play';
import bangCoverImage from '@/images/321bang.png';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { HiArrowCircleDown, HiArrowDown } from 'react-icons/hi';
import {
  useMutation,
  useOthers,
  useRoom,
  useSelf,
  useStorage,
} from '../../../../liveblocks.config';

enum EGameView {
  MAIN_MENU,
  GAMEPLAY,
}

interface IGameSession {
  id: string;
  playerName: string;
}

interface IGameState {
  sessionInfo?: IGameSession;
  activeView: EGameView;
  quitGame: () => void;
  createGameSession: () => Promise<string>;
}

const gameStateContext = createContext<IGameState>({
  sessionInfo: undefined,
  activeView: EGameView.MAIN_MENU,
  quitGame: () => {},
  createGameSession: async () => '',
});

const MainMenuView = () => {
  const { sessionInfo, quitGame } = useContext(gameStateContext);

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
          <Link
            href={`${window.location.protocol}//${window.location.host}${window.location.pathname}?sid=${sessionInfo?.id}`}
            className={
              'block text-center py-2 w-full rounded-md bg-black text-3xl text-white font-black transition sm:hover:bg-[#dedede] sm:hover:text-black'
            }
          >
            HOST GAME
          </Link>
          <button
            className={
              'py-2 w-full bg-black/50 text-3xl rounded-md text-white font-black transition sm:hover:bg-[#dedede] sm:hover:text-black'
            }
            onClick={() => quitGame()}
          >
            QUIT
          </button>
        </div>
      </div>
    </FullScreenMobileView>
  );
};

const GameplayView = () => {
  const { sessionInfo } = useContext(gameStateContext);

  const [isHost, setIsHost] = useState(false);

  const room = useRoom();
  const self = useSelf();
  const others = useOthers();

  const userCount = others.length;
  const root = useStorage((root) => root);

  const matchPhase = useStorage(
    (root) => root.matchInfo.phase ?? IMatchPhase.WAITING,
  );
  const countdown = useStorage((root) => root.matchInfo.countdown ?? 5);
  const winner = useStorage((root) => root.matchInfo.winner ?? 1000);

  const myScore = self?.presence.score ?? 0;
  const otherScore = others[0]?.presence.score ?? 0;

  const setMatchPhase = useMutation(({ storage }, phase: IMatchPhase) => {
    storage.get('matchInfo').set('phase', phase);
  }, []);

  const setCountdownValue = useMutation(({ storage }, value: number) => {
    storage.get('matchInfo').set('countdown', value);
  }, []);

  const setWinner = useMutation(({ storage }, value: number) => {
    storage.get('matchInfo').set('winner', value);
  }, []);

  const setMyscore = useMutation(
    ({ storage, setMyPresence }, value: number) => {
      setMyPresence({ score: value });
    },
    [],
  );

  function startCountdownPhase() {
    if (!root) return;
    setMatchPhase(IMatchPhase.COUNTDOWN);
  }

  useEffect(() => {
    if (!countdown) return;

    let countdownTimer: NodeJS.Timeout;

    if (matchPhase === IMatchPhase.COUNTDOWN && countdown > 0) {
      countdownTimer = setTimeout(() => {
        if (countdown > 1) {
          setCountdownValue(countdown - 1);
        } else {
          setMatchPhase(IMatchPhase.PAUSE);
        }
      }, 1000);
    }

    if (matchPhase === IMatchPhase.PAUSE) {
      const randomPauseDuration = Math.floor(Math.random() * 10000) + 1000; // random value between 1 and 10 seconds
      countdownTimer = setTimeout(() => {
        setMatchPhase(IMatchPhase.BANG);
      }, randomPauseDuration);
    }

    if (matchPhase === IMatchPhase.ROUND_COMPLETE) {
      countdownTimer = setTimeout(() => {
        setMatchPhase(IMatchPhase.COUNTDOWN);
        setCountdownValue(5);
        setWinner(1000000);
        setClicked(false);
      }, 2000);
    }

    return () => {
      clearTimeout(countdownTimer);
    };
  }, [matchPhase, countdown, setCountdownValue]);

  useEffect(() => {
    if (myScore === 3) {
      setMatchPhase(IMatchPhase.MATCH_COMPLETE);
    }
  }, [myScore]);

  useEffect(() => {
    if (userCount === 0) {
      setIsHost(true);
    }
    if (isHost && userCount === 1) {
      startCountdownPhase();
    }
  }, [userCount]);

  const [clicked, setClicked] = useState(false);

  const handleBangClick = () => {
    if (matchPhase !== IMatchPhase.BANG || clicked || !self) return;

    setClicked(true);

    // Optimistically assume a win for the player who clicked
    setMatchPhase(IMatchPhase.ROUND_COMPLETE);
    setWinner(self.connectionId);
    setMyscore(myScore + 1);

    // Broadcast to the other player
    room.broadcastEvent({
      type: 'BANG_CLICKED',
      from: self.connectionId,
    });
  };

  useEffect(() => {
    room.subscribe('event', ({ event }) => {
      // @ts-ignore
      if (event.type === 'BANG_CLICKED' && !clicked) {
        // If the player didn't click and receives the event, they lost
        // @ts-ignore
        setWinner(event.from);
        if (clicked) setMyscore(myScore - 1);
      }
    });
  }, [room, clicked]);

  if (!sessionInfo) return null;

  return (
    <FullScreenMobileView>
      {matchPhase ? (
        <div className="h-full flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <Link
              className="inline-flex h-[42px] w-[42px] items-center justify-center px-12 gap-1 rounded-md bg-gray-300 font-bold hover:bg-gray-300 sm:w-auto sm:px-6"
              href={'/play/321bang/?p=true'}
            >
              QUIT
            </Link>

            <div className={'flex gap-2 items-center'}>
              <div
                className={
                  'bg-blue-300 font-bold aspect-square w-[42px] rounded-md flex justify-center items-center'
                }
              >
                {myScore}
              </div>
              <div
                className={
                  'bg-red-300 font-bold aspect-square w-[42px] rounded-md flex justify-center items-center'
                }
              >
                {otherScore}
              </div>
            </div>
          </div>
          <div className={'flex-1 flex flex-col justify-center items-center'}>
            <div className="flex-1 flex items-center ">
              {matchPhase === IMatchPhase.WAITING && (
                <p className={'text-2xl font-black'}>Waiting for players...</p>
              )}
              {countdown && matchPhase === IMatchPhase.COUNTDOWN && (
                <p className={'text-2xl font-black'}>
                  {countdown > 3 ? 'GET READY' : countdown}
                </p>
              )}
              {matchPhase === IMatchPhase.PAUSE && <p>wait for it...</p>}
              {matchPhase === IMatchPhase.ROUND_COMPLETE && (
                <div className={'text-center'}>
                  {winner === self?.connectionId ? (
                    <p className={'text-5xl uppercase font-black'}>
                      Shot that sumbich
                    </p>
                  ) : (
                    <p className={'text-5xl uppercase font-black'}>
                      A hole through the head, better off dead
                    </p>
                  )}
                </div>
              )}
              {matchPhase === IMatchPhase.MATCH_COMPLETE && (
                <div className={'flex flex-col gap-2 text-center'}>
                  {myScore === 3 && (
                    <>
                      <div className={'uppercase font-black'}>you win</div>
                      <p className={'text-5xl uppercase font-black'}>
                        Fastest gun in the west
                      </p>
                    </>
                  )}
                  {otherScore === 3 && (
                    <>
                      <div className={'uppercase font-black'}>you lose</div>
                      <p className={'text-5xl uppercase font-black'}>
                        Skill issue
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="py-12 w-full">
              {matchPhase !== IMatchPhase.MATCH_COMPLETE ? (
                <button
                  className={classNames(
                    'block relative text-center py-2 font-black rounded-md w-full text-3xl',
                    {
                      'border border-dashed bg-black/0 text-black/20 hover:text-black/20 hover:bg-transparent cursor-not-allowed':
                        matchPhase === IMatchPhase.WAITING ||
                        (countdown &&
                          countdown > 3 &&
                          matchPhase === IMatchPhase.COUNTDOWN),
                      'border-none text-black/0 bg-transparent':
                        countdown &&
                        countdown <= 3 &&
                        [
                          IMatchPhase.COUNTDOWN,
                          IMatchPhase.PAUSE,
                          IMatchPhase.ROUND_COMPLETE,
                        ].includes(matchPhase),
                      'bg-black text-white sm:hover:bg-black/70':
                        matchPhase === IMatchPhase.BANG,
                    },
                  )}
                  onClick={handleBangClick}
                  disabled={matchPhase !== IMatchPhase.BANG}
                >
                  {countdown && countdown > 3 && (
                    <div
                      className={
                        'absolute bottom-full pb-4 text-xs text-black font-normal flex items-center flex-col w-full'
                      }
                    >
                      <div className="text-[10px] max-w-[300px]">
                        <div className={'font-bold'}>how to play:</div>
                        <div className=""></div>
                        This button will appear after a countdown. <br />
                        The first player to click it wins the round. <br />
                        The first player to win 3 rounds wins the game.
                      </div>
                      <HiArrowDown />
                    </div>
                  )}
                  BANG!
                </button>
              ) : (
                <Link
                  href={'/play/321bang/?p=true'}
                  className={
                    'block relative text-center py-2 rounded-md w-full bg-black text-3xl text-white font-black transition sm:hover:bg-[#dedede] sm:hover:text-black disabled:bg-transparent disabled:text-transparent disabled:border  disabled:cursor-not-allowed'
                  }
                >
                  QUIT
                </Link>
              )}
            </div>
          </div>
          {userCount > 1 && (
            <div className="flex gap-2 flex-col items-center">
              <p className={'text-[12px] font-bold'}>
                share the URL to a friend to invite them to your game
              </p>
              <HiArrowCircleDown />
            </div>
          )}
        </div>
      ) : (
        <div className="h-full flex justify-center items-center">
          Loading UI...
        </div>
      )}
    </FullScreenMobileView>
  );
};

const createSessionId = () =>
  crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

const BangGame = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const play = searchParams.get('p') || undefined;
  const sessionId = searchParams.get('sid') || undefined;

  const [currentGameSessionId, setCurrentGameSessionId] = useState<
    string | undefined
  >(sessionId || createSessionId());
  const [activeView, setActiveView] = useState<EGameView>(
    sessionId ? EGameView.GAMEPLAY : EGameView.MAIN_MENU,
  );

  const createGameSession = async () => {
    const sessionId = crypto
      .getRandomValues(new Uint32Array(1))[0]
      .toString(16);
    return sessionId;
  };

  const quitGame = () => {
    if (!currentGameSessionId || activeView === EGameView.MAIN_MENU) {
      router.push('/play/321bang');
      return;
    }
  };

  useEffect(() => {
    if (!sessionId) return;
    setCurrentGameSessionId(sessionId);
    setActiveView(EGameView.GAMEPLAY);
  }, [sessionId]);

  useEffect(() => {
    if (!play) return;
    setCurrentGameSessionId(createSessionId());
    setActiveView(EGameView.MAIN_MENU);
  }, [play]);

  return (
    <gameStateContext.Provider
      value={{
        sessionInfo: currentGameSessionId
          ? {
              id: currentGameSessionId,
              playerName: 'player',
            }
          : undefined,
        activeView,
        quitGame,
        createGameSession,
      }}
    >
      <div
        className={'bg-white relative h-[100svh] w-[100vw] fixed inset-0 z-10'}
      >
        <div>
          {activeView === EGameView.MAIN_MENU && <MainMenuView />}
          {currentGameSessionId && activeView === EGameView.GAMEPLAY && (
            <GameSession id={currentGameSessionId}>
              <GameplayView />
            </GameSession>
          )}
        </div>
      </div>
    </gameStateContext.Provider>
  );
};

export default BangGame;
