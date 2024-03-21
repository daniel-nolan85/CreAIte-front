import { MdMoneyOff } from 'react-icons/md';

const FreeCard = ({ text, imagesNum, action }) => (
  <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
    <MdMoneyOff className='mx-auto mt-[-3rem] text-main' size={80} />
    <h2 className='text-3xl font-bold text-center pt-8'>Free</h2>
    <p className='text-gray-500 text-sm pt-2 pb-6 text-center'>
      Includes access to GPT-3.5 for text generation and Dall-E-2 for basic
      image generation features.
    </p>
    <p className='text-center text-4xl font-bold'>
      $0{' '}
      <span className='text-gray-500 text-[18px] ml-[-5px] font-normal'>
        /mo
      </span>
    </p>
    <div className='text-center font-medium'>
      <p className='py-2 border-b mx-8 mt-8'>Unlimited text generations</p>
      <p className='py-2 border-b mx-8'>{imagesNum}</p>
      <p className='py-2 border-b mx-8'>Creation History</p>
      <p className='py-2 border-b mx-8'>Standard customer support</p>
    </div>
    <p className='py-6 text-center'>
      Suitable for users with moderate text and image generation needs.
    </p>
    <button
      onClick={action}
      className='bg-main w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'
    >
      {text}
    </button>
  </div>
);

export default FreeCard;
