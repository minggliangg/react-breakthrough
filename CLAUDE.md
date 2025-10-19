# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**React Breakthrough** is a React 19 + TypeScript + Vite application implementing the board game "Breakthrough". It uses Tailwind CSS for styling and follows the Atomic Design pattern for component organization.

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | TypeScript compile + production build |
| `npm run lint` | Run ESLint checks |
| `npm run preview` | Preview production build locally |

## Tech Stack

- **React 19.1.1** with TypeScript ~5.9.3
- **Vite 7.1.7** - Build tool and dev server
- **Tailwind CSS 4.1.14** - Utility-first styling via `@tailwindcss/vite` plugin
- **TypeScript ESLint 8.45.0** - Type-aware linting

## Code Architecture

### Component Structure (Atomic Design)

```
App (Root)
└── GameBoard (Molecule)
    └── GameSquare[] (Atom - 8x8 grid)
        └── GamePiece (Atom - conditional)
```

**Atoms** (`src/components/atoms/`):
- `GamePiece`: SVG-based piece with `color` prop ("black" | "white")
- `GameSquare`: Board square with optional `gamePiece` prop

**Molecules** (`src/components/molecules/`):
- `GameBoard`: Generates 8x8 grid using `Array.from({ length: 64 })` with optimal `Math.floor(i / 8)` and `i % 8` calculations for row/col positioning

**Types** (`src/types/`):
- `GamePieceType`: Shared type definition for piece colors

### Key Patterns

1. **Functional Components**: All components are typed functional components
2. **Naming Convention**: Kebab-case filenames (`game-piece.tsx`), PascalCase exports (`GamePiece`)
3. **Type Safety**: Strict TypeScript mode enabled with shared types
4. **Grid Generation**: GameBoard uses single-pass `Array.from({ length: 64 })` for optimal chessboard rendering
5. **Color Scheme**:
   - Black squares/pieces: `bg-blue-500`/`fill-blue-500`
   - White squares/pieces: `bg-white`/`fill-white`

### Current State

- **No state management**: Purely presentational components (no Redux/Zustand)
- **No game logic**: Move validation and turn management not yet implemented
- **Type-safe**: `"strict": true`, `"noUnusedLocals": true`, `"noUnusedParameters": true`

## TypeScript Configuration

- **Project references**: Separate configs for app (`tsconfig.app.json`) and tooling (`tsconfig.node.json`)
- **Target**: ES2022
- **JSX**: `"react-jsx"` for automatic JSX transform (React 17+)

## ESLint Configuration

Current setup uses recommended rules. For production apps, the README suggests upgrading to type-checked rules:

```js
tseslint.configs.recommendedTypeChecked
// or stricter:
tseslint.configs.strictTypeChecked
```

Consider adding `eslint-plugin-react-x` and `eslint-plugin-react-dom` for React-specific linting.

## Build Output

Production builds output to `/dist` directory (excluded from linting). Vite optimizes and minifies for deployment.
