const DeluxeCardMini = ({ action }) => (
  <div className='w-full shadow-xl flex flex-col p-4 rounded-lg hover:scale-105 duration-300 my-4'>
    <h2 className='text-3xl font-bold text-center pb-4'>Deluxe</h2>
    <p className='text-center text-4xl font-bold'>
      $19.99{' '}
      <span className='text-gray-500 text-[18px] ml-[-5px] font-normal'>
        /mo
      </span>
    </p>
    <div className='text-center font-medium'>
      <p className='py-2 border-b mx-8'>Unlimited text generations</p>
      <p className='py-2 border-b mx-8'>100 image generations</p>
      <p className='py-2 border-b mx-8'>Creation History</p>
      <p className='py-2 border-b mx-8'>Priority customer support</p>
    </div>
    <button
      onClick={action}
      className='w-[200px] rounded-md font-medium my-3 mx-auto py-3 bg-main hover:bg-mainDark'
    >
      Select
    </button>
  </div>
);

export default DeluxeCardMini;
