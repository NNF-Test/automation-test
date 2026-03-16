export type Position = { x: number; y: number };
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type GameStatus = 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction; // To prevent multiple direction changes in one tick
  score: number;
  highScore: number;
  status: GameStatus;
  speed: number;
}
