import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Trophy, Activity } from 'lucide-react';

export const ScoreBoard: React.FC = () => {
  const { score, highScore } = useGameStore();

  return (
    <div className="flex justify-between items-center w-full max-w-[500px] mb-6 px-4 py-3 bg-dark-card border border-neon-blue/30 rounded-lg shadow-lg">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-neon-green/10 rounded-lg">
          <Activity className="w-6 h-6 text-neon-green" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-pixel uppercase">Score</span>
          <span className="text-xl text-neon-green font-pixel glow-text">{score}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400 font-pixel uppercase">High Score</span>
          <span className="text-xl text-neon-pink font-pixel">{highScore}</span>
        </div>
        <div className="p-2 bg-neon-pink/10 rounded-lg">
          <Trophy className="w-6 h-6 text-neon-pink" />
        </div>
      </div>
    </div>
  );
};
