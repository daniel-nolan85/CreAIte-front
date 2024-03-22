import LoaderBlack from './LoaderBlack';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
  generatingPrompt,
}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor={name}
          className='block text-sm font-medium text-gray-900'
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <div className='relative'>
            <button
              type='button'
              onClick={handleSurpriseMe}
              className='font-semibold text-sm bg-main hover:bg-mainDark py-1 px-2 rounded-[5px] text-black w-full'
            >
              <span className={generatingPrompt ? 'text-main' : ''}>
                Surprise me
              </span>
            </button>
            {generatingPrompt && (
              <span className='absolute inset-0 flex justify-center items-center'>
                <LoaderBlack />
              </span>
            )}
          </div>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mainDark focus:border-mainDark outline-none block w-full p-3'
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormField;
