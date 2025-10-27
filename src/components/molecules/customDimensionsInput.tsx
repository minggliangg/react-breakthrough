interface CustomDimensionsInputProps {
  rows: number | undefined;
  cols: number | undefined;
  errors: { rows?: string; cols?: string };
  onRowsChange: (value: number | undefined) => void;
  onColsChange: (value: number | undefined) => void;
  minSize?: number;
  maxSize?: number;
}

const CustomDimensionsInput = ({
  rows,
  cols,
  errors,
  onRowsChange,
  onColsChange,
  minSize = 4,
  maxSize = 26,
}: CustomDimensionsInputProps) => {
  const handleNumberInput = (
    value: number,
    setter: (val: number | undefined) => void,
  ) => {
    if (isNaN(value) || value === 0) {
      setter(undefined);
      return;
    }
    setter(value);
  };

  const handleInputBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    setter: (val: number | undefined) => void,
  ) => {
    if (!e.currentTarget.value || isNaN(e.currentTarget.valueAsNumber)) {
      setter(undefined);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className='flex flex-col gap-4 mx-auto'>
      <p className='italic text-center opacity-50'>
        Supported custom dimensions from {minSize}x{minSize} to {maxSize}x
        {maxSize}.
      </p>
      <div className='flex flex-col md:flex-row gap-4 mx-auto'>
        <label className='form-control w-36'>
          <div className='label'>
            <span className='label-text'>Columns</span>
          </div>
          <input
            type='number'
            placeholder='Columns'
            value={cols ?? ''}
            onChange={(e) =>
              handleNumberInput(e.currentTarget.valueAsNumber, onColsChange)
            }
            onBlur={(e) => handleInputBlur(e, onColsChange)}
            className={`input input-bordered ${errors.cols ? 'input-error' : ''}`}
          />
        </label>
        <label className='form-control w-36'>
          <div className='label'>
            <span className='label-text'>Rows</span>
          </div>
          <input
            type='number'
            placeholder='Rows'
            value={rows ?? ''}
            onChange={(e) =>
              handleNumberInput(e.currentTarget.valueAsNumber, onRowsChange)
            }
            onBlur={(e) => handleInputBlur(e, onRowsChange)}
            className={`input input-bordered ${errors.rows ? 'input-error' : ''}`}
          />
        </label>
      </div>
      {hasErrors && (
        <div className='alert alert-error'>
          <span>
            Invalid dimensions. Must be between {minSize} and {maxSize}.
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomDimensionsInput;
