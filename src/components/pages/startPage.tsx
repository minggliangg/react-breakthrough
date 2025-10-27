import { useState } from 'react';
import useGameMechanic from '../../hooks/useGameMechanic';
import CustomDimensionsInput from '../molecules/customDimensionsInput';
import ThemeSelector from '../molecules/themeSelector';

interface StartPageProps {
  callback: () => void;
}

const StartPage = ({ callback }: StartPageProps) => {
  const { startGame } = useGameMechanic();

  const [isCustom, setIsCustom] = useState(false);
  const [rows, setRows] = useState<number | undefined>();
  const [cols, setCols] = useState<number | undefined>();
  const [errors, setErrors] = useState<{ rows?: string; cols?: string }>({});

  const MIN_SIZE = 4;
  const MAX_SIZE = 26;

  const validateDimension = (value: number | undefined): boolean => {
    if (value === undefined) return false;
    return value >= MIN_SIZE && value <= MAX_SIZE;
  };

  const handleDimensionChange = () => {
    // Clear errors when user changes input
    setErrors({});
  };

  const handleStartOnClick = () => {
    if (!isCustom) {
      startGame();
      callback();
      return;
    }

    // Validate custom dimensions
    const newErrors: { rows?: string; cols?: string } = {};

    if (!validateDimension(rows)) {
      newErrors.rows = `Must be between ${MIN_SIZE} and ${MAX_SIZE}`;
    }
    if (!validateDimension(cols)) {
      newErrors.cols = `Must be between ${MIN_SIZE} and ${MAX_SIZE}`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    startGame(rows, cols);
    callback();
  };

  const isStartButtonDisabled =
    isCustom && (!rows || !cols || Object.keys(errors).length > 0);

  return (
    <div className='flex flex-col gap-4 mx-auto w-xs sm:w-sm md:w-md'>
      <h1 className='text-4xl font-extrabold text-center'>Breakthrough</h1>
      <p className='italic text-center opacity-50'>
        The ultimate pawn race where every move is a daring dash to your
        opponent's home row—simple rules, cutthroat strategy!
      </p>

      <div className='flex justify-center'>
        <ul className='menu bg-base-200 rounded-box w-56'>
          <li>
            <ThemeSelector />
          </li>
        </ul>
      </div>

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
        <CustomDimensionsInput
          rows={rows}
          cols={cols}
          errors={errors}
          onRowsChange={(val) => {
            setRows(val);
            handleDimensionChange();
          }}
          onColsChange={(val) => {
            setCols(val);
            handleDimensionChange();
          }}
          minSize={MIN_SIZE}
          maxSize={MAX_SIZE}
        />
      )}
    </div>
  );
};

export default StartPage;
