import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Modal from './Modal';
import like from '../assets/like.svg';
import liked from '../assets/liked.svg';
import download from '../assets/download.svg';
import {
  handleDownloadCreation,
  handleLikeCreation,
  handleUnlikeCreation,
} from '../requests/creation';

const Card = ({
  _id,
  createdBy,
  prompt,
  photo,
  createdAt,
  likes,
  downloads,
  sharing,
  personalProfile,
  fetchCreations,
}) => {
  const [showCardInfoModal, setShowCardInfoModal] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const downloadCreation = async (creationId, photo) => {
    await handleDownloadCreation(creationId, photo).then((res) => {
      console.log(res.data);
      fetchCreations();
    });
  };

  const likeCreation = async (token, userId, creationId) => {
    await handleLikeCreation(token, userId, creationId).then((res) => {
      console.log(res.data);
      fetchCreations();
    });
  };

  const unlikeCreation = async (token, userId, creationId) => {
    await handleUnlikeCreation(token, userId, creationId).then((res) => {
      console.log(res.data);
      fetchCreations();
    });
  };

  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      <div className='absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 rounded-xl'></div>
      <img
        src={photo}
        alt={prompt}
        className={`w-full h-auto object-cover rounded-xl cursor-pointer ${
          !sharing && !personalProfile ? 'blur' : ''
        }`}
        onClick={() => setShowCardInfoModal(true)}
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-white text-sm sm:text-md overflow-y-auto prompt'>
          {prompt}
        </p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          {(personalProfile || sharing) && (
            <button
              type='button'
              onClick={() => downloadCreation(_id, photo)}
              className='outline-none bg-transparent '
            >
              <img
                src={download}
                alt='download'
                className='w-6 h-6 object-contain'
              />
            </button>
          )}
          {user && user._id && (
            <button
              type='button'
              onClick={() => {
                likes.some((like) => like === user._id)
                  ? unlikeCreation(user.token, user._id, _id)
                  : likeCreation(user.token, user._id, _id);
              }}
              className='outline-none bg-transparent'
            >
              <img
                src={
                  likes &&
                  likes.length > 0 &&
                  likes.some((like) => like === user._id)
                    ? liked
                    : like
                }
                alt='download'
                className='w-6 h-6 object-contain hover:bg-opacity-50'
              />
            </button>
          )}
        </div>
      </div>
      <Modal
        isVisible={showCardInfoModal}
        onClose={() => setShowCardInfoModal(false)}
      >
        <div className='p-6 flex flex-col sm:flex-row  sm:mt-0 mt-6'>
          <img
            src={photo}
            alt={prompt}
            className='h-auto object-cover rounded-xl sm:w-1/2 w-full'
          />
          <div className='flex-col'>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-900'>Prompt</p>
              <h3 className='text-md font-medium text-gray-400 mb-4'>
                {prompt}
              </h3>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-900'>CreAIted by</p>
              <Link to={`/user-profile/${createdBy._id}`}>
                <p className='text-md font-medium text-gray-400'>
                  {createdBy.name}
                </p>
              </Link>
            </div>
            <div className='m-4'>
              <p className='text-sm font-medium text-gray-900'>Resolution</p>
              <h3 className='text-md font-medium text-gray-400 mb-4'>
                1024x1024
              </h3>
            </div>
            <div className='m-4'>
              <p className='text-sm font-medium text-gray-900'>Created on</p>
              <h3 className='text-md font-medium text-gray-400 mb-4'>
                {moment(createdAt).format('ddd, MMMM Do YYYY')}
              </h3>
            </div>
            <div className='flex ml-4'>
              <div className='w-1/2'>
                <p className='text-sm font-medium text-gray-900'>Likes</p>
                <h3 className='text-md font-medium text-gray-400 mb-4'>
                  {likes.length}
                </h3>
              </div>
              <div className='w-1/2'>
                <p className='text-sm font-medium text-gray-900'>Downloads</p>
                <h3 className='text-md font-medium text-gray-400 mb-4'>
                  {downloads}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
