import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PageLoader from '../components/PageLoader';
import FormField from '../components/FormField';
import Card from '../components/Card';
import defaultProfile from '../assets/profile.svg';
import { fetchUserCreations } from '../requests/creation';
import { fetchUser } from '../requests/user';

const RenderCards = ({ data, title, getUserCreations }) => {
  if (data?.length > 0) {
    return data.map((creation) => (
      <Card creation={creation} fetchCreations={getUserCreations} />
    ));
  }
  return (
    <h2 className='mt-5 font-bold text-main text-xl uppercase'>{title}</h2>
  );
};

const UserProfile = () => {
  const [thisUser, setThisUser] = useState({});
  const [userCreations, setUserCreations] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const { token } = useSelector((state) => state.user) || {};

  const { userId } = useParams();

  useEffect(() => {
    getUser();
    getUserCreations();
  }, [token]);

  const getUser = async () => {
    await fetchUser(token, userId)
      .then((res) => {
        setThisUser(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getUserCreations = async () => {
    await fetchUserCreations(token, userId)
      .then((res) => {
        setUserCreations(res.data.creations);
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
        const searchResults = userCreations.filter((item) =>
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  if (!thisUser || !userCreations) {
    return <PageLoader />;
  }

  return (
    <>
      <Navbar />
      <section className='max-w-7xl mx-auto p-4'>
        <div className='flex flex-col items-center justify-center py-4'>
          <div className='container rounded shadow-lg bg-white'>
            {thisUser.coverImage ? (
              <img
                src={thisUser.coverImage.url}
                alt={`${thisUser.name}'s cover image`}
                className='w-full md:h-64 lg:h-96 xl:h-128 rounded rounded-b-none'
              />
            ) : (
              <div className='w-full h-32 md:h-64 lg:h-96 xl:h-128 rounded rounded-b-none bg-main' />
            )}
            <div className='flex justify-between'>
              <div className='p-4'>
                <img
                  src={
                    thisUser.profileImage
                      ? thisUser.profileImage.url
                      : defaultProfile
                  }
                  alt={`${thisUser.name}'s profile picture`}
                  className='w-32 h-32 rounded-full border-4 border-white mr-8 -mt-16 bg-white'
                />
                <div>
                  <h1 className='text-xl font-bold text-gray-800'>
                    {thisUser.name}
                  </h1>
                  <p className='text-gray-500'>
                    Software Engineer at Nolancode
                  </p>
                </div>
              </div>
            </div>
            <div className='bg-gray-400 my-2 mx-4' style={{ height: 1 }}></div>
            <div className='p-4'>
              <p className='text-gray-800'>
                <b>{userCreations.length}</b> CreAItions
              </p>
            </div>
          </div>
          <div className='container w-full py-4 mt-8'>
            <FormField
              labelName='Search creations'
              type='text'
              name='text'
              placeholder='Search creations'
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
            <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3'>
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title='No search results found'
                  getUserCreations={getUserCreations}
                />
              ) : (
                <RenderCards
                  data={userCreations}
                  title='No CreAItions found'
                  getUserCreations={getUserCreations}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
