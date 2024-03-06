import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import FormField from '../components/FormField';
import Card from '../components/Card';
import defaultProfile from '../assets/profile.svg';
import { fetchUserCreations } from '../requests/creation';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((creation) => <Card key={creation._id} {...creation} />);
  }
  return (
    <h2 className='mt-5 font-bold text-main text-xl uppercase'>{title}</h2>
  );
};

const Profile = () => {
  const [userCreations, setUserCreations] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const { user } = useSelector((state) => ({ ...state }));

  console.log({ userCreations });

  useEffect(() => {
    getUserCreations();
  }, [user]);

  const getUserCreations = async () => {
    await fetchUserCreations(user.token, user._id)
      .then((res) => {
        console.log('res => ', res.data);
        console.log('success');
        setUserCreations(res.data);
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

  if (!user || !userCreations) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <section className='max-w-7xl mx-auto p-4'>
        <div className='flex flex-col items-center justify-center py-4'>
          <div className='container rounded shadow-lg bg-white'>
            {user.coverPhoto ? (
              <img
                src={user.coverPhoto.url}
                alt={`${user.name}'s cover image`}
                className='w-full h-32 rounded rounded-b-none'
              />
            ) : (
              <div className='w-full h-48 rounded rounded-b-none bg-main' />
            )}
            <div className='p-4'>
              <img
                src={user.profileImage ? user.profileImage.url : defaultProfile}
                alt={`${user.name}'s profile picture`}
                className='w-32 h-32 rounded-full border-4 border-white mr-8 -mt-16 bg-white'
              />
              <div>
                <h1 className='text-xl font-bold text-gray-800'>{user.name}</h1>
                <p className='text-gray-500'>Software Engineer at Nolancode</p>
              </div>
            </div>
            <div className='bg-gray-400 my-2 mx-4' style={{ height: 1 }}></div>
            <div className='p-4'>
              <p className='text-gray-800'>
                <b>5</b> creations
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
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title='No search results found'
                />
              ) : (
                <RenderCards data={userCreations} title='No creations found' />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
