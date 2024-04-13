import { useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const Modal = ({ isVisible, onClose, children }) => {
  useEffect(() => {
    const body = document.body;
    if (isVisible) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    return () => {
      body.style.overflow = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  return (
    <div
      onClick={handleClose}
      id='wrapper'
      className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50 overflow-y-auto'
    >
      <div className='md:w-[600px] w-[90%] mx-auto flex flex-col h-full mb-22'>
        <button onClick={onClose} className='text-white text-xl place-self-end'>
          <IoIosCloseCircleOutline className='h-12 w-12 text-main relative right-2 top-14' />
        </button>
        <div className='bg-white p-2 rounded'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
