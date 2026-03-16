import { create } from 'zustand';
import { GameState, Direction, Position } from '../types/game';

// Constants
const GRID_SIZE = 25;
const INITIAL_SPEED = 120;
const MIN_SPEED = 50;
const SPEED_DECREMENT = 3;

// Helper to generate random food position
const generateFood = (snake: Position[], gridSize: number): Position => {
  let newFood: Position;
  let isOnSnake = true;

  while (isOnSnake) {
    newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    // eslint-disable-next-line no-loop-func
    isOnSnake = snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
    if (!isOnSnake) return newFood;
  }
  return { x: 0, y: 0 }; // Fallback
};

interface GameStore extends GameState {
  // Actions
  startGame: () => void;
  pauseGame: () => void;
  resetGame: () => void;
  setDirection: (direction: Direction) => void;
  moveSnake: () => void;
  updateHighScore: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  snake: [{ x: 10, y: 10 }],
  food: { x: 15, y: 10 },
  direction: 'RIGHT',
  nextDirection: 'RIGHT',
  score: 0,
  highScore: Number(localStorage.getItem('snake_high_score')) || 0,
  status: 'IDLE',
  speed: INITIAL_SPEED,

  startGame: () => {
    const { status } = get();
    if (status === 'IDLE' || status === 'GAME_OVER') {
      set({
        snake: [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }],
        food: generateFood([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }], GRID_SIZE),
        direction: 'RIGHT',
        nextDirection: 'RIGHT',
        score: 0,
        status: 'PLAYING',
        speed: INITIAL_SPEED,
      });
    } else if (status === 'PAUSED') {
      set({ status: 'PLAYING' });
    }
  },

  pauseGame: () => {
    const { status } = get();
    if (status === 'PLAYING') {
      set({ status: 'PAUSED' });
    }
  },

  resetGame: () => {
    set({
      status: 'IDLE',
      score: 0,
      snake: [{ x: 10, y: 10 }],
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
    });
  },

  setDirection: (newDirection: Direction) => {
    const { direction, nextDirection } = get();
    
    // Prevent reversing direction
    const isOpposite = 
      (direction === 'UP' && newDirection === 'DOWN') ||
      (direction === 'DOWN' && newDirection === 'UP') ||
      (direction === 'LEFT' && newDirection === 'RIGHT') ||
      (direction === 'RIGHT' && newDirection === 'LEFT');
    
    // Also prevent rapid double turns
    if (!isOpposite) {
      set({ nextDirection: newDirection });
    }
  },

  moveSnake: () => {
    const { snake, direction, nextDirection, food, score, speed, highScore } = get();
    
    // Update direction from buffer
    const currentDirection = nextDirection;
    set({ direction: currentDirection });

    const head = { ...snake[0] };

    switch (currentDirection) {
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'RIGHT': head.x += 1; break;
    }

    // Check collision with walls
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      get().updateHighScore();
      set({ status: 'GAME_OVER' });
      return;
    }

    // Check collision with self
    if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
      get().updateHighScore();
      set({ status: 'GAME_OVER' });
      return;
    }

    const newSnake = [head, ...snake];

    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
      // Grow snake (don't pop tail)
      const newScore = score + 10;
      const newSpeed = Math.max(MIN_SPEED, speed - SPEED_DECREMENT);
      set({
        score: newScore,
        speed: newSpeed,
        snake: newSnake,
        food: generateFood(newSnake, GRID_SIZE),
      });
    } else {
      // Move snake (pop tail)
      newSnake.pop();
      set({ snake: newSnake });
    }
  },

  updateHighScore: () => {
    const { score, highScore } = get();
    if (score > highScore) {
      set({ highScore: score });
      localStorage.setItem('snake_high_score', score.toString());
    }
  },
}));
