import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Modal from './Modal';
import Keywords from './Keywords';
import likeOutline from '../assets/like-outline.svg';
import likeFill from '../assets/like-fill.svg';
import download from '../assets/download.svg';
import defaultProfile from '../assets/profile.svg';

const Card = ({
  creation,
  photo,
  personalProfile,
  handleDownload,
  handleLike,
  handleDislike,
}) => {
  const [showCardInfoModal, setShowCardInfoModal] = useState(false);

  const {
    _id,
    createdBy,
    prompt,
    createdAt,
    likes,
    liked,
    downloads,
    downloaded,
    sharing,
    caption,
    keywords,
    imageSize,
    model,
  } = creation;
  const { token, _id: userId } = useSelector((state) => state.user) || {};

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card mb-3">
      <div
        onClick={() => setShowCardInfoModal(true)}
        className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-opacity duration-300 rounded-xl cursor-pointer"
      ></div>
      <img
        src={photo}
        alt={prompt}
        className={`w-full h-auto object-cover rounded-xl ${
          !sharing && !personalProfile ? 'blur' : ''
        }`}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm sm:text-md overflow-y-auto prompt">
          {prompt.length > 75 ? prompt.slice(0, 75) + '...' : prompt}
        </p>
        <div className="mt-5 flex justify-between items-center gap-2">
          {(personalProfile || sharing) && (
            <button
              type="button"
              onClick={() => handleDownload(_id, photo, userId)}
              className="outline-none bg-transparent "
            >
              <img
                src={download}
                alt="download"
                className="w-6 h-6 object-contain"
              />
            </button>
          )}
          {userId && !personalProfile && (
            <button
              type="button"
              onClick={() => {
                liked === false
                  ? handleLike(token, userId, _id)
                  : liked || likes.some((like) => like === userId)
                  ? handleDislike(token, userId, _id)
                  : handleLike(token, userId, _id);
              }}
              className="outline-none bg-transparent"
            >
              <img
                src={
                  liked === false
                    ? likeOutline
                    : liked || likes.some((like) => like === userId)
                    ? likeFill
                    : likeOutline
                }
                alt="like or dislike"
                className="w-6 h-6 object-contain hover:bg-opacity-50"
              />
            </button>
          )}
        </div>
      </div>
      <Modal
        isVisible={showCardInfoModal}
        onClose={() => setShowCardInfoModal(false)}
      >
        <div className="p-6 flex flex-col mt-6 overflow-auto">
          <img
            src={photo}
            alt={prompt}
            className="h-auto object-cover rounded-xl w-full"
          />
          <div className="flex-col">
            <div className="ml-4 mt-4">
              <p className="text-sm font-medium text-gray-900">Prompt</p>
              <h3 className="text-md font-medium text-gray-400 mb-4">
                {prompt}
              </h3>
            </div>
            {caption && (
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">Caption</p>
                <h3 className="text-md font-medium text-gray-400 mb-4">
                  {caption.slice(1, -1)}
                </h3>
              </div>
            )}
            {keywords && (
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 mb-2">
                  Keywords
                </p>
                <h3 className="text-md font-medium text-gray-400 mb-4">
                  <Keywords keywords={keywords} />
                </h3>
              </div>
            )}
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">CreAIted by</p>
              {createdBy ? (
                <Link
                  to={`/user-profile/${createdBy._id}`}
                  className="flex items-center mt-2"
                >
                  <img
                    src={
                      createdBy.profileImage
                        ? createdBy.profileImage.url
                        : defaultProfile
                    }
                    alt={`${createdBy.name}'s profile picture`}
                    className="w-12 rounded-full"
                  />
                  <p className="text-md font-medium text-gray-400 ml-2">
                    {createdBy.name}
                  </p>
                </Link>
              ) : (
                <div className="flex items-center mt-2">
                  <img
                    src={defaultProfile}
                    alt={`Default profile picture`}
                    className="w-12 rounded-full"
                  />
                  <p className="text-md font-medium text-gray-400 ml-2">
                    Deleted User
                  </p>
                </div>
              )}
            </div>
            <div className="m-4">
              <p className="text-sm font-medium text-gray-900">Model</p>
              <h3 className="text-md font-medium text-gray-400 mb-4">
                {model}
              </h3>
            </div>
            <div className="m-4">
              <p className="text-sm font-medium text-gray-900">Resolution</p>
              <h3 className="text-md font-medium text-gray-400 mb-4">
                {imageSize}
              </h3>
            </div>
            <div className="m-4">
              <p className="text-sm font-medium text-gray-900">CreAIted on</p>
              <h3 className="text-md font-medium text-gray-400 mb-4">
                {moment(createdAt).format('ddd, MMMM Do YYYY')}
              </h3>
            </div>
            <div className="flex ml-4">
              <div className="w-1/2">
                <p className="text-sm font-medium text-gray-900">Likes</p>
                <h3 className="text-md font-medium text-gray-400 mb-4">
                  {liked ? likes.length + 1 : likes.length}
                </h3>
              </div>
              <div className="w-1/2">
                <p className="text-sm font-medium text-gray-900">Downloads</p>
                <h3 className="text-md font-medium text-gray-400 mb-4">
                  {downloaded ? downloads + 1 : downloads}
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
