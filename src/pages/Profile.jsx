import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PageLoader from '../components/PageLoader';
import LoaderBlack from '../components/LoaderBlack';
import FormField from '../components/FormField';
import Card from '../components/Card';
import Modal from '../components/Modal';
import ImageCropper from '../components/ImageCropper';
import defaultProfile from '../assets/profile.svg';
import edit from '../assets/edit.svg';
import editGrey from '../assets/edit-grey.svg';
import { fetchUserCreations } from '../requests/creation';
import {
  updateUserProfile,
  updateUserProfileImage,
  updateUserCoverImage,
} from '../requests/user';
import {
  uploadMediaToCloudinary,
  destroyMediaFromCloudinary,
} from '../requests/cloudinary';

const tabs = ['Shared', 'Private', 'Liked'];

const RenderCards = ({ data, title, getUserCreations }) => {
  if (data?.length > 0) {
    return data.map((creation) => (
      <Card
        creation={creation}
        personalProfile
        fetchCreations={getUserCreations}
      />
    ));
  }
  return (
    <h2 className='mt-5 font-bold text-main text-xl uppercase'>{title}</h2>
  );
};

const Chip = ({ text, selected, setSelected, setSearchText }) => {
  return (
    <button
      onClick={() => {
        setSelected(text);
        setSearchText('');
      }}
      className={`${
        selected
          ? 'text-black'
          : 'text-slate-300 hover:text-slate-200 hover:bg-slate-700'
      } font-medium px-4 py-2 rounded-md relative`}
    >
      <span className='relative z-10'>{text}</span>
      {selected && (
        <motion.span
          layoutId='pill-tab'
          transition={{ type: 'spring', duration: 0.5 }}
          className='absolute inset-0 z-0 bg-main rounded-md'
        ></motion.span>
      )}
    </button>
  );
};

const Profile = () => {
  const [sharedCreations, setSharedCreations] = useState(null);
  const [privateCreations, setPrivateCreations] = useState(null);
  const [likedCreations, setLikedCreations] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [showUpdateProfileImageModal, setShowUpdateProfileImageModal] =
    useState(false);
  const [showUpdateCoverImageModal, setShowUpdateCoverImageModal] =
    useState(false);
  const [newName, setNewName] = useState('');
  const [newBio, setNewBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [showShared, setShowShared] = useState(true);
  const [showPrivate, setShowPrivate] = useState(true);
  const [showLiked, setShowLiked] = useState(true);
  const [selected, setSelected] = useState(tabs[0]);

  const { token, _id, name, bio, coverImage, profileImage } =
    useSelector((state) => state.user) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    if (_id) {
      getUserCreations();
      setNewName(name);
      setNewBio(bio || '');
    }
  }, [_id]);

  useEffect(() => {
    if (selected === 'Shared') {
      setShowShared(true);
      setShowPrivate(false);
      setShowLiked(false);
    } else if (selected === 'Private') {
      setShowPrivate(true);
      setShowShared(false);
      setShowLiked(false);
    } else {
      setShowLiked(true);
      setShowShared(false);
      setShowPrivate(false);
    }
  }, [selected]);

  const getUserCreations = async () => {
    await fetchUserCreations(token, _id)
      .then((res) => {
        console.log(res.data);
        setSharedCreations(
          res.data.creations.filter((creation) => creation.sharing === true)
        );
        setPrivateCreations(
          res.data.creations.filter((creation) => creation.sharing === false)
        );
        setLikedCreations(res.data.likedCreations);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        let searchResults;
        showShared &&
          (searchResults = sharedCreations.filter((item) =>
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
          ));
        showPrivate &&
          (searchResults = privateCreations.filter((item) =>
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
          ));
        showLiked &&
          (searchResults = likedCreations.filter((item) =>
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
          ));
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await updateUserProfile(token, _id, newName, newBio)
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            name: res.data.name,
            bio: res.data.bio,
            token,
            _id: res.data._id,
            email: res.data.email,
            name: res.data.name,
            bio: res.data.bio,
            profileImage: res.data.profileImage,
            coverImage: res.data.coverImage,
          },
        });
        setIsLoading(false);
        setShowUpdateProfileModal(false);
      })
      .catch((err) => console.error(err));
  };

  const updateImage = async (
    imgSrc,
    updateFunction,
    imageType,
    setShowModal
  ) => {
    console.log({ imageType });
    if (imageType) {
      await destroyMediaFromCloudinary(token, imageType.public_id);
    }
    const byteCharacters = atob(imgSrc.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    const formData = new FormData();
    formData.append('image', blob, 'image.jpg');
    const { data } = await uploadMediaToCloudinary(formData);
    await updateFunction(token, _id, data)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            name: res.data.name,
            bio: res.data.bio,
            token,
            _id: res.data._id,
            email: res.data.email,
            name: res.data.name,
            bio: res.data.bio,
            profileImage: res.data.profileImage,
            coverImage: res.data.coverImage,
          },
        });
        setShowModal(false);
        setIsImageLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsImageLoading(false);
        setShowModal(false);
      });
  };

  const updateProfileImage = async (imgSrc) => {
    setIsImageLoading(true);
    await updateImage(
      imgSrc,
      updateUserProfileImage,
      profileImage,
      setShowUpdateProfileImageModal
    );
  };

  const updateCoverImage = async (imgSrc) => {
    setIsImageLoading(true);
    await updateImage(
      imgSrc,
      updateUserCoverImage,
      coverImage,
      setShowUpdateCoverImageModal
    );
  };

  if (!_id || !sharedCreations || !privateCreations) {
    return <PageLoader />;
  }

  return (
    <>
      <Navbar />
      <section className='max-w-7xl mx-auto p-4'>
        <div className='flex flex-col items-center justify-center py-4'>
          <div
            className='container rounded shadow-lg bg-white'
            style={{ overflow: 'hidden' }}
          >
            {coverImage ? (
              <div className='relative'>
                <img
                  src={coverImage.url}
                  alt={`${name}'s cover image`}
                  className='w-full md:h-64 lg:h-96 xl:h-128 rounded rounded-b-none'
                />
                <img
                  onClick={() => setShowUpdateCoverImageModal(true)}
                  src={editGrey}
                  alt='edit icon'
                  className='absolute top-2 right-2 w-12 rounded-full cursor-pointer'
                />
              </div>
            ) : (
              <div className='relative'>
                <div className='w-full h-32 md:h-64 lg:h-96 xl:h-128 rounded rounded-b-none bg-main' />
                <img
                  onClick={() => setShowUpdateCoverImageModal(true)}
                  src={editGrey}
                  alt='edit icon'
                  className='absolute top-2 right-2 w-12 rounded-full cursor-pointer'
                />
              </div>
            )}
            <div className='flex justify-between'>
              <div className='p-4'>
                <div className='relative w-32'>
                  <img
                    src={profileImage ? profileImage.url : defaultProfile}
                    alt={`${name}'s profile picture`}
                    className='w-32 h-32 rounded-full border-4 border-white mr-8 -mt-16 mb-2 bg-white'
                  />
                  <img
                    onClick={() => setShowUpdateProfileImageModal(true)}
                    src={editGrey}
                    alt='edit icon'
                    className='absolute bottom-[-10px] left-12 w-8 rounded-full cursor-pointer'
                  />
                </div>
                <div>
                  <h1 className='text-xl font-bold text-gray-800'>{name}</h1>
                  <p className='text-gray-500'>{bio}</p>
                </div>
              </div>
              <img
                onClick={() => setShowUpdateProfileModal(true)}
                src={edit}
                alt='edit icon'
                className='h-16 w-16 cursor-pointer'
              />
            </div>
            <div className='bg-gray-400 my-2 mx-4' style={{ height: 1 }}></div>
            <div className='p-4'>
              <p className='text-gray-800'>
                <b>{sharedCreations.length + privateCreations.length}</b>{' '}
                creations
              </p>
            </div>
          </div>

          <div className='px-4 pt-14 flex items-center flex-wrap gap-2'>
            {tabs.map((tab) => (
              <Chip
                text={tab}
                selected={selected === tab}
                setSelected={setSelected}
                setSearchText={setSearchText}
                key={tab}
              />
            ))}
          </div>

          <div className='container w-full py-4 mt-8'>
            <FormField
              labelName={`${
                showShared
                  ? 'Search your shared CreAItions'
                  : showPrivate
                  ? 'Search your private CreAItions'
                  : showLiked && 'Search your liked CreAItions'
              }`}
              type='text'
              name='text'
              placeholder={`${
                showShared
                  ? 'Search your shared CreAItions'
                  : showPrivate
                  ? 'Search your private CreAItions'
                  : showLiked && 'Search your liked CreAItions'
              }`}
              value={searchText}
              handleChange={handleSearchChange}
            />
          </div>
          <div className='container w-full py-4'>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for{' '}
                <span className='text-[#222328]'>{searchText}</span>
              </h2>
            )}

            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title='No search results found'
                  getUserCreations={getUserCreations}
                />
              ) : (
                <RenderCards
                  data={
                    showShared
                      ? sharedCreations
                      : showPrivate
                      ? privateCreations
                      : likedCreations
                  }
                  title='No creations found'
                  getUserCreations={getUserCreations}
                />
              )}
            </div>
          </div>
        </div>
        <Modal
          isVisible={showUpdateProfileModal}
          onClose={() => setShowUpdateProfileModal(false)}
        >
          <div className='p-6 lg:px-8 text-left'>
            <h3 className='text-xl font-medium text-gray-900 mb-4'>
              Update your profile
            </h3>
            <form className='space-y-6' onSubmit={updateProfile}>
              <div>
                <FormField
                  labelName='Name'
                  type='text'
                  name='name'
                  placeholder='Name'
                  value={newName}
                  handleChange={(e) => setNewName(e.target.value)}
                />
                <div className='mb-2'></div>
                <FormField
                  labelName='Bio'
                  type='text'
                  name='bio'
                  placeholder='Bio'
                  value={newBio}
                  handleChange={(e) => setNewBio(e.target.value)}
                />
              </div>
              <button
                type='submit'
                className='w-full mt-3 text-black bg-main hover:bg-mainDark font-medium rounded-md text-sm px-5 py-2.5 text-center'
              >
                {isLoading ? <LoaderBlack /> : 'Update'}
              </button>
            </form>
          </div>
        </Modal>
        <Modal
          isVisible={showUpdateProfileImageModal}
          onClose={() => setShowUpdateProfileImageModal(false)}
        >
          <div className='p-6 lg:px-8 text-left'>
            <h3 className='text-xl font-medium text-gray-900 mb-4'>
              Update your profile image
            </h3>
            <ImageCropper
              updateImage={updateProfileImage}
              aspectRatio={1}
              isImageLoading={isImageLoading}
            />
          </div>
        </Modal>
        <Modal
          isVisible={showUpdateCoverImageModal}
          onClose={() => setShowUpdateCoverImageModal(false)}
        >
          <div className='p-6 lg:px-8 text-left'>
            <h3 className='text-xl font-medium text-gray-900 mb-4'>
              Update your cover image
            </h3>
            <ImageCropper
              updateImage={updateCoverImage}
              aspectRatio={16 / 9}
              isImageLoading={isImageLoading}
            />
          </div>
        </Modal>
      </section>
    </>
  );
};

export default Profile;
