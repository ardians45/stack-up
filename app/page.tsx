"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

// Import semua komponen yang dibutuhkan
import Tower from './components/Tower';
import Controls from './components/Controls';
import Header from './components/Header';
import WinModal from './components/WinModal';
import WelcomeScreen from './components/WelcomeScreen';
import PortfolioBadge from './components/PortfolioBadge';

type TowersState = {
  [key: string]: number[];
};

const sounds = {
  pick: new Howl({ src: ['/sounds/pick.wav'], volume: 0.5 }),
  place: new Howl({ src: ['/sounds/place.wav'], volume: 0.5 }),
  error: new Howl({ src: ['/sounds/error.wav'], volume: 0.4 }),
  win: new Howl({ src: ['/sounds/win.wav'], volume: 0.7 }),
  // PENYESUAIAN FITUR: Volume musik latar dikecilkan 50%
  background: new Howl({
    src: ['/sounds/background-music.mp3'],
    loop: true,
    volume: 0.1, // Volume diubah dari 0.2 menjadi 0.1
    html5: true,
  }),
};

const MAX_LEVEL_DISKS = 8; // Batas maksimal jumlah cakram

export default function HomePage() {
  const [gameState, setGameState] = useState<'welcome' | 'playing'>('welcome');
  const [numberOfDisks, setNumberOfDisks] = useState(3);
  const [towers, setTowers] = useState<TowersState>({});
  const [selectedTower, setSelectedTower] = useState<string | null>(null);
  const [moves, setMoves] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [history, setHistory] = useState<TowersState[]>([]);
  const [isSolving, setIsSolving] = useState(false);
  const solverIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // FITUR BARU: State untuk feedback langkah tidak valid
  const [errorTower, setErrorTower] = useState<string | null>(null);

  const optimalMoves = useMemo(() => Math.pow(2, numberOfDisks) - 1, [numberOfDisks]);

  const handleStartGame = () => {
    resetGame(3);
    setGameState('playing');
    if (!sounds.background.playing()) {
      const soundId = sounds.background.play();
      sounds.background.once('playerror', () => console.log("Autoplay diblokir."));
      sounds.background.once('play', () => {
        setIsMusicPlaying(true);
        const currentPos = sounds.background.seek();
        if (typeof currentPos === 'number' && currentPos < 10) {
          sounds.background.seek(10, soundId);
        }
      });
    }
  };

  const resetGame = (diskCount = numberOfDisks) => {
    if (solverIntervalRef.current) clearInterval(solverIntervalRef.current);
    const initialDisks: number[] = Array.from({ length: diskCount }, (_, i) => diskCount - i);
    setTowers({ A: initialDisks, B: [], C: [] });
    setMoves(0);
    setSelectedTower(null);
    setIsWin(false);
    setNumberOfDisks(diskCount);
    setGameState('playing');
    setHistory([]);
    setIsSolving(false);
  };
  
  const handleDiskCountChange = (count: number) => {
    resetGame(count);
  };

  const toggleMusic = () => {
    if (sounds.background.playing()) {
      sounds.background.pause();
      setIsMusicPlaying(false);
    } else {
      const soundId = sounds.background.play();
      sounds.background.once('play', () => {
        setIsMusicPlaying(true);
        const currentPos = sounds.background.seek();
        if (typeof currentPos === 'number' && currentPos < 10) {
            sounds.background.seek(10, soundId);
        }
      });
    }
  };

  const handleUndo = () => {
    if (history.length === 0 || isSolving) return;
    const lastState = history[history.length - 1];
    setTowers(lastState);
    setHistory(prevHistory => prevHistory.slice(0, -1));
    setMoves(prevMoves => prevMoves - 1);
  };

  const startSolver = () => {
    const initialTowersState: TowersState = {
      A: Array.from({ length: numberOfDisks }, (_, i) => numberOfDisks - i),
      B: [], C: [],
    };
    setTowers(initialTowersState);
    setMoves(0);
    setHistory([]);
    setIsSolving(true);

    const movesList: { from: string; to: string }[] = [];
    function solveHanoi(n: number, source: string, auxiliary: string, destination: string) {
      if (n === 1) {
        movesList.push({ from: source, to: destination }); return;
      }
      solveHanoi(n - 1, source, destination, auxiliary);
      movesList.push({ from: source, to: destination });
      solveHanoi(n - 1, auxiliary, source, destination);
    }
    solveHanoi(numberOfDisks, 'A', 'B', 'C');

    let currentTowers: TowersState = initialTowersState;
    let moveIndex = 0;
    solverIntervalRef.current = setInterval(() => {
      if (moveIndex >= movesList.length) {
        if (solverIntervalRef.current) clearInterval(solverIntervalRef.current);
        setIsSolving(false); return;
      }
      const move = movesList[moveIndex];
      const sourceDisks = [...currentTowers[move.from]];
      const disk = sourceDisks.pop();
      const targetDisks = [...currentTowers[move.to]];
      if (disk !== undefined) targetDisks.push(disk);
      currentTowers = { ...currentTowers, [move.from]: sourceDisks, [move.to]: targetDisks };
      setTowers(currentTowers);
      setMoves(prev => prev + 1);
      sounds.place.play();
      moveIndex++;
    }, 400);
  };


  // FITUR BARU: Fungsi untuk lanjut ke level berikutnya
  const handleNextLevel = () => {
    if (numberOfDisks < MAX_LEVEL_DISKS) {
      resetGame(numberOfDisks + 1);
    }
  };

  useEffect(() => {
    return () => { Object.values(sounds).forEach(sound => sound.stop()); };
  }, []);

  useEffect(() => {
    if (towers.C?.length === numberOfDisks && moves > 0) {
      setIsWin(true);
      sounds.win.play();
    }
  }, [towers, numberOfDisks, moves]);

  const handleTowerClick = (towerId: string) => {
    if (isWin || isSolving) return;
    if (!selectedTower) {
      if (towers[towerId]?.length > 0) {
        setSelectedTower(towerId);
        sounds.pick.play();
      }
    } else {
      const sourceTowerDisks = [...towers[selectedTower]];
      const targetTowerDisks = [...towers[towerId]];
      const diskToMove = sourceTowerDisks[sourceTowerDisks.length - 1];
      const topDiskOnTarget = targetTowerDisks[targetTowerDisks.length - 1];
      if (!topDiskOnTarget || diskToMove < topDiskOnTarget) {
        setHistory(prevHistory => [...prevHistory, towers]);
        sourceTowerDisks.pop();
        targetTowerDisks.push(diskToMove);
        setTowers({ ...towers, [selectedTower]: sourceTowerDisks, [towerId]: targetTowerDisks });
        setMoves(prevMoves => prevMoves + 1);
        sounds.place.play();
      } else {
        sounds.error.play();
        // FITUR BARU: Set tower yang error untuk memicu animasi
        setErrorTower(towerId);
        // Hapus status error setelah animasi selesai
        setTimeout(() => setErrorTower(null), 500);
      }
      setSelectedTower(null);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {gameState === 'welcome' ? (
          <WelcomeScreen key="welcome" onStartGame={handleStartGame} />
        ) : (
          <main key="game" className="flex flex-col items-center justify-between p-4 min-h-screen relative">
            <div className="absolute top-4 right-4 z-20">
              <button onClick={toggleMusic} className="p-3 bg-gray-800/60 rounded-full text-white hover:bg-purple-500 transition-colors" aria-label="Toggle Music">
                {isMusicPlaying ? <FaVolumeUp size={20} /> : <FaVolumeMute size={20} />}
              </button>
            </div>
            <Header />
            <div className="w-full max-w-4xl flex justify-around items-end my-8 flex-grow">
              {['A', 'B', 'C'].map((id) => (
                towers[id] && (
                  <Tower
                    key={id}
                    id={id}
                    disks={towers[id]}
                    totalDisks={numberOfDisks}
                    onClick={handleTowerClick}
                    isSelected={selectedTower === id}
                    // FITUR BARU: Kirim prop error ke komponen Tower
                    isError={errorTower === id}
                  />
                )
              ))}
            </div>
            <Controls
              onReset={() => resetGame()}
              onDiskCountChange={handleDiskCountChange}
              diskCount={numberOfDisks}
              moves={moves}
              optimalMoves={optimalMoves}
              onUndo={handleUndo}
              canUndo={history.length > 0}
              onSolve={startSolver}
              isSolving={isSolving}
            />
            <WinModal
              isOpen={isWin}
              // FITUR BARU: Kirim fungsi-fungsi baru ke WinModal
              onPlayAgain={() => resetGame()}
              onNextLevel={handleNextLevel}
              isMaxLevel={numberOfDisks >= MAX_LEVEL_DISKS}
              moves={moves}
              optimalMoves={optimalMoves}
            />
          </main>
        )}
      </AnimatePresence>
      <PortfolioBadge />
    </>
  );
}