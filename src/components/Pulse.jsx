import { MdOutlineMessage } from 'react-icons/md';

const Pulse = ({ setShowChatModal }) => {
  return (
    <div className='pulse-container fixed bottom-10 right-10'>
      <button
        className='bg-main hover:bg-mainDark w-12 h-12 rounded-full relative flex items-center justify-center'
        onClick={() => setShowChatModal(true)}
      >
        <MdOutlineMessage className='md:w-6 w-4 h-4 md:h-6' />
      </button>
    </div>
  );
};

export default Pulse;
