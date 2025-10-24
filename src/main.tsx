import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import BoardStateProvider from './contexts/boardStateProvider.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BoardStateProvider>
      <App />
    </BoardStateProvider>
  </StrictMode>,
);
