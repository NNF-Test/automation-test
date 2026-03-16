## 1. 架构设计
本项目采用纯前端架构，基于 React 框架构建。无后端服务，利用浏览器 LocalStorage 存储用户最高分。

```mermaid
graph TD
    User[用户] --> Frontend[React 前端应用]
    Frontend --> GameLoop[游戏循环逻辑]
    Frontend --> Renderer[Canvas/DOM 渲染器]
    Frontend --> Storage[LocalStorage (最高分)]
```

## 2. 技术栈描述
- **前端框架**: React @18
- **构建工具**: Vite
- **样式方案**: TailwindCSS @3 (用于布局和UI组件) + CSS Modules (用于游戏特定特效)
- **状态管理**: React Hooks (useState, useEffect, useRef, useReducer)
- **动画/特效**: Framer Motion (可选，用于UI过渡) 或 CSS Keyframes
- **图标库**: Lucide React 或 React Icons

## 3. 路由定义
本项目为单页应用 (SPA)，仅需一个主路由。

| 路由 | 用途 |
|---|---|
| / | 游戏主页，包含所有游戏逻辑和界面 |

## 4. 数据模型
### 4.1 游戏状态定义 (TypeScript 接口)
```typescript
type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type GameStatus = 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

interface GameState {
  snake: Position[];     // 蛇身坐标数组，头部为索引0
  food: Position;        // 食物坐标
  direction: Direction;  // 当前移动方向
  score: number;         // 当前分数
  highScore: number;     // 最高分
  status: GameStatus;    // 游戏状态
  speed: number;         // 当前移动速度（毫秒间隔）
}
```

### 4.2 本地存储
- `snake_game_high_score`: 存储用户的最高分 (number)。
