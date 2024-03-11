import { useState } from 'react';
import { Link } from 'react-router-dom';
import download from '../assets/download.png';
import { downloadCreation } from '../utils';
import Modal from './Modal';

const Card = ({ _id, createdBy, prompt, photo, sharing, personalProfile }) => {
  const [showCardInfoModal, setShowCardInfoModal] = useState(false);

  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <img
        src={photo}
        alt={prompt}
        className={`w-full h-auto object-cover rounded-xl ${
          !sharing && !personalProfile ? 'blur' : ''
        }`}
        onClick={() => setShowCardInfoModal(true)}
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-white text-md overflow-y-auto prompt'>{prompt}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <Link
            to={`/user-profile/${createdBy._id}`}
            className='flex items-center gap-2'
          >
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold'>
              {createdBy.name[0]}
            </div>
            <p className='text-white text-sm'>{createdBy.name}</p>
          </Link>
          {sharing && (
            <button
              type='button'
              onClick={() => downloadCreation(_id, photo)}
              className='outline-none bg-transparent'
            >
              <img
                src={download}
                alt='download'
                className='w-6 h-6 object-contain invert'
              />
            </button>
          )}
        </div>
      </div>
      <Modal
        isVisible={showCardInfoModal}
        onClose={() => setShowCardInfoModal(false)}
      >
        <div className='p-6 lg:px-8 text-left'>
          <h3 className='text-xl font-medium text-gray-900 mb-4'>
            Update your profile
          </h3>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
