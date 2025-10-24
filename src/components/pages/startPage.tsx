import { useState } from 'react';
import useGameMechanic from '../../hooks/useGameMechanic';

const StartPage = () => {
  const { startGame } = useGameMechanic();

  const [isCustom, setIsCustom] = useState(false);
  const [rows, setRows] = useState<number | undefined>();
  const [cols, setCols] = useState<number | undefined>();

  const handleNumberInput = (
    value: number,
    setter: (val: number | undefined) => void,
  ) => {
    if (isNaN(value)) {
      setter(undefined);
      return;
    }
    // Clamp between 4 and 26
    const clamped = Math.min(Math.max(value, 4), 26);
    setter(clamped);
  };

  const handleStartOnClick = () => {
    startGame(rows, cols);
  };

  const isStartButtonDisabled = isCustom && (!rows || !cols);

  return (
    <div className='flex flex-col gap-4 mx-auto w-xs sm:w-sm md:w-md'>
      <h1 className='text-4xl font-extrabold text-center'>Breakthrough</h1>
      <p className='italic text-center opacity-50'>
        The ultimate pawn race where every move is a daring dash to your
        opponent’s home row—simple rules, cutthroat strategy!
      </p>

      <button
        className='btn btn-primary mt-4'
        disabled={isStartButtonDisabled}
        onClick={handleStartOnClick}
      >
        Start game
      </button>

      <label className='label mx-auto'>
        <input
          type='checkbox'
          checked={isCustom}
          onChange={() => setIsCustom((prev) => !prev)}
          className='checkbox checkbox-sm checkbox-primary'
        />
        Custom dimensions
      </label>

      {isCustom && (
        <div className='flex flex-col gap-4 mx-auto'>
          <p className='italic text-center opacity-50'>
            Supported custom dimensions from 4x4 to 26x26.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mx-auto'>
            <label className='input w-36 items-center'>
              <p>◫</p>
              <input
                type='number'
                placeholder='Columns'
                min={4}
                max={26}
                value={cols}
                onChange={(e) =>
                  handleNumberInput(e.currentTarget.valueAsNumber, setCols)
                }
                onBlur={(e) => {
                  if (
                    !e.currentTarget.value ||
                    isNaN(e.currentTarget.valueAsNumber)
                  ) {
                    setCols(undefined);
                  }
                }}
              />
            </label>
            <label className='input w-36 items-center'>
              <p className='rotate-90'>◫</p>
              <input
                type='number'
                placeholder='Rows'
                min={4}
                max={26}
                value={rows}
                onChange={(e) =>
                  handleNumberInput(e.currentTarget.valueAsNumber, setRows)
                }
                onBlur={(e) => {
                  if (
                    !e.currentTarget.value ||
                    isNaN(e.currentTarget.valueAsNumber)
                  ) {
                    setRows(undefined);
                  }
                }}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartPage;
