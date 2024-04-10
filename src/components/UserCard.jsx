import { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Modal from './Modal';
import defaultProfile from '../assets/profile.svg';

const UserCard = ({ user }) => {
  const [showCardInfoModal, setShowCardInfoModal] = useState(false);

  const {
    _id,
    name,
    profileImage,
    email,
    createdAt,
    lastLogin,
    subscription,
    likes,
    downloads,
  } = user;

  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card mb-3'>
      <div
        onClick={() => setShowCardInfoModal(true)}
        className='absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 rounded-xl cursor-pointer'
      ></div>
      <img
        src={profileImage ? profileImage.url : defaultProfile}
        alt={`${name}'s profile picture`}
        className='w-full h-auto object-cover rounded-xl'
      />
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        <p className='text-white text-sm sm:text-md overflow-y-auto prompt'>
          {name}
        </p>
      </div>
      <Modal
        isVisible={showCardInfoModal}
        onClose={() => setShowCardInfoModal(false)}
      >
        <div className='p-6 flex flex-col mt-6'>
          <img
            src={profileImage ? profileImage.url : defaultProfile}
            alt={`${name}'s profile picture`}
            className='h-auto object-cover rounded-xl w-full'
          />
          <div className='flex-col'>
            <div className='ml-4 mt-4'>
              <p className='text-sm font-medium text-gray-900'>Name</p>
              <h3 className='text-md font-medium text-gray-400 mb-4'>{name}</h3>
            </div>
            <div className='ml-4'>
              <p className='text-sm font-medium text-gray-900'>CreAIted by</p>
              <Link
                to={`/user-profile/${_id}`}
                className='flex items-center mt-2'
              >
                <img
                  src={profileImage ? profileImage.url : defaultProfile}
                  alt={`${name}'s profile picture`}
                  className='w-12 rounded-full'
                />
                <p className='text-md font-medium text-gray-400 ml-2'>{name}</p>
              </Link>
            </div>
            <div className='m-4'>
              <p className='text-sm font-medium text-gray-900'>Email</p>
              <h3 className='text-md font-medium text-gray-400 mb-4'>
                {email}
              </h3>
            </div>
            <div className='m-4'>
              <p className='text-sm font-medium text-gray-900'>Subscription</p>
              <h3 className='text-md font-medium text-gray-400 mb-4'>
                {subscription.plan}
              </h3>
            </div>
            <div className='m-4'>
              <p className='text-sm font-medium text-gray-900'>Member since</p>
              <h3 className='text-md font-medium text-gray-400 mb-4'>
                {moment(createdAt).format('ddd, MMMM Do YYYY')}
              </h3>
            </div>
            <div className='m-4'>
              <p className='text-sm font-medium text-gray-900'>Last login</p>
              <h3 className='text-md font-medium text-gray-400 mb-4'>
                {moment(lastLogin).format('ddd, MMMM Do YYYY')}
              </h3>
            </div>
            <div className='flex ml-4'>
              <div className='w-1/2'>
                <p className='text-sm font-medium text-gray-900'>Likes</p>
                <h3 className='text-md font-medium text-gray-400 mb-4'>
                  {likes}
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

export default UserCard;
