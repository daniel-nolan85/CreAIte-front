import { MdDashboardCustomize } from 'react-icons/md';

const CustomCard = ({ text, action, cancelled, cancelPopup, subscription }) => (
  <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
    <MdDashboardCustomize className='mx-auto mt-[-3rem] text-main' size={80} />

    <h2 className='text-3xl font-bold text-center pt-8'>Custom</h2>
    <p className='text-gray-500 text-sm pt-2 pb-6 text-center'>
      Offers flexibility to choose between different GPT levels and image
      generation options.
    </p>
    <p className='text-center text-4xl font-bold'>You Decide</p>
    <div className='text-center font-medium'>
      <p className='py-2 border-b mx-8 mt-8'>Unlimited text generations</p>
      <p className='py-2 border-b mx-8'>Custom image generation</p>
      <p className='py-2 border-b mx-8'>Creation History</p>
      <p className='py-2 border-b mx-8'>Priority customer support</p>
    </div>
    <p className='py-6 text-center'>
      Ideal for businesses or enterprises with unique requirements and
      larger-scale usage.
    </p>
    <button
      onClick={action}
      className='bg-main hover:bg-mainDark w-[200px] rounded-md font-medium my-3 mx-auto py-3 text-black'
    >
      {text}
    </button>
    {!cancelled && subscription && (
      <button
        onClick={cancelPopup}
        className='bg-red hover:bg-redDark w-[200px] rounded-md font-medium my-3 mx-auto py-3 text-black'
      >
        Cancel
      </button>
    )}
  </div>
);

export default CustomCard;
