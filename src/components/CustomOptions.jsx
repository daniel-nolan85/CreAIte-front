import StaggeredDropdown from './StaggeredDropdown';
import FormField from './FormField';

const CustomOptions = ({
  calculateCustomAmount,
  customOptions,
  setCustomOptions,
}) => {
  return (
    <div className='w-full shadow-xl flex flex-col p-4 rounded-lg hover:scale-105 duration-300 my-4'>
      <h2 className='text-3xl font-bold text-center pt-4'>Custom</h2>
      <form className='mt-8' onSubmit={calculateCustomAmount}>
        <div className='flex justify-between items-center mb-4'>
          <StaggeredDropdown
            header='Choose Dall-E version'
            option={customOptions.dallEVersion}
            setOption={(value) =>
              setCustomOptions((prevState) => ({
                ...prevState,
                dallEVersion: value,
              }))
            }
            options='dalle'
          />
          <StaggeredDropdown
            header='Choose GPT version'
            option={customOptions.gptVersion}
            setOption={(value) =>
              setCustomOptions((prevState) => ({
                ...prevState,
                gptVersion: value,
              }))
            }
            options='gpt'
          />
          <StaggeredDropdown
            header='Choose customer support level'
            option={customOptions.customerSupport}
            setOption={(value) =>
              setCustomOptions((prevState) => ({
                ...prevState,
                customerSupport: value,
              }))
            }
            options='support'
          />
        </div>
        <FormField
          labelName='Number of CreAItions'
          type='number'
          name='numCreAItions'
          placeholder='Enter the number of CreAItions needed per month'
          value={customOptions.numCreAItions}
          handleChange={(e) => {
            setCustomOptions({
              ...customOptions,
              [e.target.name]: e.target.value,
            });
          }}
        />
        <button
          type='submit'
          className='w-40 mt-4 text-black bg-main hover:bg-mainDark font-medium rounded-md text-sm px-5 py-2.5 text-center'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomOptions;
