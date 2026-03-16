import React, { useEffect, useRef } from 'react';
import { useGameStore, GRID_SIZE } from '../store/gameStore';
import { clsx } from 'clsx';



export const GameCanvas: React.FC = () => {
  const { snake, food, direction, status, setDirection, moveSnake, speed } = useGameStore();
  const gameLoopRef = useRef<number | null>(null);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setDirection]);

  // Game Loop
  useEffect(() => {
    if (status === 'PLAYING') {
      const runGameLoop = () => {
        moveSnake();
        gameLoopRef.current = window.setTimeout(runGameLoop, speed);
      };
      runGameLoop();
    } else {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearTimeout(gameLoopRef.current);
      }
    };
  }, [status, moveSnake, speed]);

  return (
    <div 
      className="relative w-full h-full bg-dark-card border-4 border-neon-blue rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.3)] overflow-hidden"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
      }}
    >
      {/* Grid Background (Optional, using CSS for simplicity) */}
      
      {/* Snake */}
      {snake.map((segment, index) => {
        const isHead = index === 0;
        return (
          <div
            key={`${segment.x}-${segment.y}`}
            className={clsx(
              "rounded-sm transition-all duration-75",
              isHead ? "bg-neon-green z-10 shadow-[0_0_10px_#00ff00]" : "bg-green-500/80"
            )}
            style={{
              gridColumn: segment.x + 1,
              gridRow: segment.y + 1,
              borderRadius: isHead 
                ? direction === 'UP' ? '4px 4px 0 0' 
                : direction === 'DOWN' ? '0 0 4px 4px'
                : direction === 'LEFT' ? '4px 0 0 4px'
                : '0 4px 4px 0'
                : '1px'
            }}
          >
            {isHead && (
              <div className="relative w-full h-full">
                 <div className={clsx(
                   "absolute w-[20%] h-[20%] bg-black rounded-full",
                   direction === 'UP' ? "top-[10%] left-[20%]" : 
                   direction === 'DOWN' ? "bottom-[10%] left-[20%]" :
                   direction === 'LEFT' ? "top-[20%] left-[10%]" : "top-[20%] right-[10%]"
                 )} />
                 <div className={clsx(
                   "absolute w-[20%] h-[20%] bg-black rounded-full",
                   direction === 'UP' ? "top-[10%] right-[20%]" : 
                   direction === 'DOWN' ? "bottom-[10%] right-[20%]" :
                   direction === 'LEFT' ? "bottom-[20%] left-[10%]" : "bottom-[20%] right-[10%]"
                 )} />
              </div>
            )}
          </div>
        );
      })}

      {/* Food */}
      <div
        className="bg-neon-red rounded-full shadow-[0_0_15px_#ff0000] animate-pulse-fast"
        style={{
          gridColumn: food.x + 1,
          gridRow: food.y + 1,
          transform: 'scale(0.8)'
        }}
      />
    </div>
  );
};
