import { useSelector } from 'react-redux';
import { MdOutlineMessage } from 'react-icons/md';

const Pulse = ({ handleOpenChatModal }) => {
  const { newMessages } = useSelector((state) => state.user) || {};

  return (
    <div className='pulse-container fixed bottom-10 right-10 z-50'>
      <button
        className='bg-main hover:bg-mainDark w-12 h-12 rounded-full relative flex items-center justify-center'
        onClick={handleOpenChatModal}
      >
        <MdOutlineMessage className='md:w-6 w-4 h-4 md:h-6' />
      </button>
      {newMessages > 0 && (
        <span className='bg-red text-white rounded-full px-2 py-1 text-xs font-bold absolute top-0 right-0 -mt-2 -mr-2'>
          {newMessages}
        </span>
      )}
    </div>
  );
};

export default Pulse;
