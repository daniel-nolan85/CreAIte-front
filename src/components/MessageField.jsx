const MessageField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
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
      </div>
      <textarea
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

export default MessageField;
