import { useEffect, useRef } from 'react';
import useGameMechanic from '../../hooks/useGameMechanic';
import useBoardStore from '../../stores/useBoardStore';
import GameBoard from '../molecules/gameBoard';
import GameInfoPanel from '../molecules/gameInfoPanel';

interface GamePageProps {
  onQuit: () => void;
}

const GamePage = ({ onQuit }: GamePageProps) => {
  // Use selective subscriptions to prevent unnecessary rerenders
  const board = useBoardStore((state) => state.board);
  const rows = useBoardStore((state) => state.rows);
  const cols = useBoardStore((state) => state.cols);
  const { winner } = useGameMechanic();

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const winnerResult = winner();
    if (winnerResult && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [board]);

  if (!board || !rows || !cols) {
    return <span className='loading loading-bars loading-xl' />;
  }

  const winnerResult = winner();

  return (
    <>
      <dialog ref={modalRef} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Game Over!</h3>
          <p className='py-4'>
            <span className='capitalize font-semibold'>{winnerResult}</span>{' '}
            player wins!
          </p>
          <div className='modal-action'>
            <button
              className='btn'
              onClick={() => {
                onQuit();
                modalRef.current?.close();
              }}
            >
              Back to Start
            </button>
          </div>
        </div>
      </dialog>
      <div className='flex gap-4 flex-col md:flex-row'>
        <div className='flex flex-col items-center'>
          <GameBoard board={board} rows={rows} columns={cols} />
        </div>
        <GameInfoPanel onQuit={onQuit} />
      </div>
    </>
  );
};
export default GamePage;
