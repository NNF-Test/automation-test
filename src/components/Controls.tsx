import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Play, Pause, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export const Controls: React.FC = () => {
  const { status, startGame, pauseGame, resetGame, setDirection } = useGameStore();

  return (
    <div className="flex flex-col items-center gap-6 mt-6 w-full max-w-[500px]">
      {/* Game Actions */}
      <div className="flex gap-4">
        {status === 'PLAYING' ? (
          <button
            onClick={pauseGame}
            className="flex items-center gap-2 px-6 py-2 bg-yellow-500/20 text-yellow-500 border border-yellow-500 rounded hover:bg-yellow-500/30 transition-all font-pixel text-sm"
          >
            <Pause size={16} /> PAUSE
          </button>
        ) : (
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-6 py-2 bg-neon-green/20 text-neon-green border border-neon-green rounded hover:bg-neon-green/30 transition-all font-pixel text-sm shadow-[0_0_10px_rgba(0,255,0,0.3)]"
          >
            <Play size={16} /> {status === 'PAUSED' ? 'RESUME' : 'START'}
          </button>
        )}

        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-6 py-2 bg-neon-red/20 text-neon-red border border-neon-red rounded hover:bg-neon-red/30 transition-all font-pixel text-sm"
        >
          <RotateCcw size={16} /> RESET
        </button>
      </div>

      {/* Mobile D-Pad (Hidden on large screens usually, but kept for touch devices) */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button
          className="p-4 bg-dark-card border border-white/10 rounded-lg active:bg-white/10 active:scale-95 transition-all"
          onClick={() => setDirection('UP')}
        >
          <ArrowUp className="text-white" />
        </button>
        <div />
        
        <button
          className="p-4 bg-dark-card border border-white/10 rounded-lg active:bg-white/10 active:scale-95 transition-all"
          onClick={() => setDirection('LEFT')}
        >
          <ArrowLeft className="text-white" />
        </button>
        <button
          className="p-4 bg-dark-card border border-white/10 rounded-lg active:bg-white/10 active:scale-95 transition-all"
          onClick={() => setDirection('DOWN')}
        >
          <ArrowDown className="text-white" />
        </button>
        <button
          className="p-4 bg-dark-card border border-white/10 rounded-lg active:bg-white/10 active:scale-95 transition-all"
          onClick={() => setDirection('RIGHT')}
        >
          <ArrowRight className="text-white" />
        </button>
      </div>

      {/* Keyboard Hints */}
      <div className="hidden md:flex text-gray-500 text-xs font-pixel gap-8">
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-1">
            <span className="w-6 h-6 border border-gray-700 flex items-center justify-center rounded">W</span>
          </div>
          <div className="flex gap-1">
            <span className="w-6 h-6 border border-gray-700 flex items-center justify-center rounded">A</span>
            <span className="w-6 h-6 border border-gray-700 flex items-center justify-center rounded">S</span>
            <span className="w-6 h-6 border border-gray-700 flex items-center justify-center rounded">D</span>
          </div>
          <span>MOVE</span>
        </div>
        
        <div className="flex flex-col items-center gap-1">
            <span className="h-6 px-2 border border-gray-700 flex items-center justify-center rounded">SPACE</span>
            <span>PAUSE/RESUME</span>
        </div>
      </div>
    </div>
  );
};
