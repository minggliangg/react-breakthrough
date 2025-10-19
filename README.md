# React Breakthrough

A React 19 + TypeScript + Vite implementation of the board game "Breakthrough". Built with Tailwind CSS and organized using Atomic Design patterns.

## Prerequisites

- Node.js 18+
- npm or pnpm

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Start Development Server

```bash
npm run dev
```

This starts the Vite dev server with hot module reloading (HMR). Open the URL shown in your terminal (typically `http://localhost:5173`) in your browser.

### 3. Build for Production

```bash
npm run build
```

Compiles TypeScript and creates an optimized production build in the `/dist` directory.

### 4. Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing before deployment.

### 5. Run Linting

```bash
npm run lint
```

Runs ESLint checks on your code for TypeScript and style issues.

## Tech Stack

- **React 19.1.1** - UI framework
- **TypeScript ~5.9.3** - Type safety
- **Vite 7.1.7** - Build tool and dev server
- **Tailwind CSS 4.1.14** - Utility-first styling
- **TypeScript ESLint 8.45.0** - Linting

## Project Structure

```
src/
├── components/
│   ├── atoms/          - Basic UI elements (GamePiece, GameSquare)
│   └── molecules/      - Composed components (GameBoard)
├── hooks/              - Custom React hooks
├── contexts/           - React Context for state management
├── utils/              - Constants, types, and utilities
└── App.tsx             - Root component
```

For detailed architecture information, see `CLAUDE.md`.
