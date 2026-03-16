import React from 'react';
import { useGameStore } from '../store/gameStore';
import { RotateCcw } from 'lucide-react';

export const GameOverOverlay: React.FC = () => {
  const { status, score, startGame, resetGame } = useGameStore();

  if (status !== 'GAME_OVER') return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <h2 className="text-4xl md:text-6xl font-pixel text-neon-red mb-4 animate-bounce glow-text">
        GAME OVER
      </h2>
      
      <div className="flex flex-col items-center gap-2 mb-8">
        <span className="text-gray-400 font-pixel text-sm">FINAL SCORE</span>
        <span className="text-3xl text-white font-pixel">{score}</span>
      </div>

      <button
        onClick={() => {
          resetGame();
          startGame();
        }}
        className="group flex items-center gap-3 px-8 py-4 bg-neon-green text-black font-pixel font-bold rounded hover:bg-neon-green/80 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,0,0.5)]"
      >
        <RotateCcw className="group-hover:rotate-180 transition-transform duration-500" />
        TRY AGAIN
      </button>
    </div>
  );
};
