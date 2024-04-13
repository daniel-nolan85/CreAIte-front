import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormField from '../FormField';
import UserCard from '../UserCard';
import Loader from '../Loader';
import { fetchAllUsers } from '../../requests/admin';

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((user) => <UserCard key={user._id} user={user} />);
  }
  return (
    <h2 className='mt-5 font-bold text-main text-xl uppercase'>{title}</h2>
  );
};

const Users = () => {
  const [users, setUsers] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { token, _id } = useSelector((state) => state.user) || {};

  useEffect(() => {
    if (_id) {
      getAllUsers();
    }
  }, [_id]);

  const getAllUsers = async () => {
    await fetchAllUsers(token, _id)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(setIsLoading(false));
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = users.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className='w-full p-4 bg-white'>
      {isLoading ? (
        <div className='h-screen flex justify-center items-center'>
          <Loader />
        </div>
      ) : (
        <div>
          <div className='container w-full pb-4 mt-8'>
            <FormField
              labelName='Search all Users'
              type='text'
              name='text'
              placeholder='Search all Users'
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
                />
              ) : (
                <RenderCards data={users} title='No users found' />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Users;
