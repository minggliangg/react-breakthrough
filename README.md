# React Breakthrough

A React 19 + TypeScript + Vite implementation of the board game "Breakthrough". Built with Tailwind CSS and organized using Atomic Design patterns.

## Prerequisites

- Node.js 20+
- pnpm 10.19.0

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Development Server

```bash
pnpm dev
```

This starts the Vite dev server with hot module reloading (HMR). Open the URL shown in your terminal (typically `http://localhost:5173`) in your browser.

### 3. Build for Production

```bash
pnpm build
```

Compiles TypeScript and creates an optimized production build in the `/dist` directory.

### 4. Preview Production Build

```bash
pnpm preview
```

Serves the production build locally for testing before deployment.

### 5. Run Linting

```bash
pnpm lint
```

Runs ESLint checks on your code for TypeScript and style issues.

## Features

- **Start Page**: Choose between default 8x8 board or custom dimensions
- **Custom Board Options**: Create boards from 4x4 to 26x26 with real-time validation
- **Drag & Drop Gameplay**: Smooth piece movement using @dnd-kit library
- **State Management**: React Context + useReducer for game state
- **Responsive Design**: Mobile and desktop support with Tailwind CSS + DaisyUI

## Tech Stack

- **React 19.1.1** - UI framework
- **TypeScript ~5.9.3** - Type safety
- **Vite 7.1.7** - Build tool and dev server
- **Tailwind CSS 4.1.14** - Utility-first styling
- **DaisyUI 5.3.7** - UI component library
- **@dnd-kit 6.3.1** - Drag and drop functionality
- **TypeScript ESLint 8.45.0** - Linting
- **pnpm 10.19.0** - Package manager

## Project Structure

```
src/
├── components/
│   ├── atoms/          - Basic UI elements
│   │   ├── gamePiece.tsx      - Individual draggable game pieces
│   │   └── gameSquare.tsx     - Board squares with drag-and-drop
│   ├── molecules/      - Composite components
│   │   ├── gameBoard.tsx      - Main game board
│   │   └── gameMenu.tsx       - In-game menu for reset & custom dimensions
│   └── pages/
│       └── startPage.tsx      - Initial screen with game mode selection
├── contexts/
│   ├── boardStateContext.ts   - Context definition and useBoardState hook
│   └── boardStateProvider.tsx - Reducer provider for game state
├── hooks/
│   └── useGameMechanic.ts     - Game logic (moves, win conditions, validation)
├── utils/
│   ├── types.ts               - TypeScript type definitions
│   ├── constants.ts           - Game constants
│   └── boardStateUtils.ts     - Board generation & piece movement utilities
└── App.tsx                    - Root component
```
