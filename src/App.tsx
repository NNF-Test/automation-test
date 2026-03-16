import React, { useEffect } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { ScoreBoard } from './components/ScoreBoard';
import { Controls } from './components/Controls';
import { GameOverOverlay } from './components/GameOverOverlay';
import { useGameStore } from './store/gameStore';

function App() {
  const { status, startGame, pauseGame } = useGameStore();

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent scrolling
        if (status === 'PLAYING') {
          pauseGame();
        } else if (status === 'PAUSED' || status === 'IDLE') {
          startGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, startGame, pauseGame]);

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-blue/10 via-transparent to-transparent opacity-50" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-pink/10 rounded-full blur-3xl" />
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-2xl animate-in fade-in zoom-in duration-500">
        {/* Header */}
        <h1 className="text-4xl md:text-6xl font-pixel text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue mb-8 glow-text tracking-tighter">
          SNAKE.IO
        </h1>

        <ScoreBoard />

        <div className="relative group w-full max-w-[500px] aspect-square">
          <GameCanvas />
          <GameOverOverlay />
          
          {/* Status Overlay (Pause/Start) */}
          {status === 'IDLE' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-lg">
              <p className="text-neon-green font-pixel animate-pulse">PRESS START</p>
            </div>
          )}
          {status === 'PAUSED' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] rounded-lg">
              <p className="text-yellow-400 font-pixel text-2xl">PAUSED</p>
            </div>
          )}
        </div>

        <Controls />
        
        <footer className="mt-12 text-gray-600 text-xs font-pixel text-center">
          <p>© 2024 SNAKE GAME | REACT + ZUSTAND + TAILWIND</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
