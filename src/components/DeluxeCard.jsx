import { IoIosPricetag } from 'react-icons/io';

const DeluxeCard = ({ text, emphasize, action }) => (
  <div
    className={`w-full shadow-xl flex flex-col p-4 rounded-lg hover:scale-105 duration-300 ${
      emphasize ? 'bg-gray-100 my-8 md:my-0' : 'my-4'
    }`}
  >
    <IoIosPricetag className='mx-auto mt-[-3rem] text-main' size={80} />
    <h2 className='text-3xl font-bold text-center pt-8'>Deluxe</h2>
    <p className='text-gray-500 text-sm pt-2 pb-6 text-center'>
      Upgrades to Dall-E-3 for improved image quality.
    </p>
    <p className='text-center text-4xl font-bold'>
      $14.99{' '}
      <span className='text-gray-500 text-[18px] ml-[-5px] font-normal'>
        /mo
      </span>
    </p>
    <div className='text-center font-medium'>
      <p className='py-2 border-b mx-8 mt-8'>Unlimited text generations</p>
      <p className='py-2 border-b mx-8'>100 image generations</p>
      <p className='py-2 border-b mx-8'>Creation History</p>
      <p className='py-2 border-b mx-8'>Priority customer support</p>
    </div>
    <p className='py-6 text-center'>
      Designed for users with higher text and image quality requirements.
    </p>
    <button
      onClick={action}
      className={`w-[200px] rounded-md font-medium my-6 mx-auto py-3 ${
        emphasize ? 'bg-black text-main' : 'bg-main'
      }`}
    >
      {text}
    </button>
  </div>
);

export default DeluxeCard;
