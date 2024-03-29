import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import Card from '../components/Card';
import { fetchSharedCreations } from '../requests/creation';

const RenderCards = ({ data, title, getSharedCreations }) => {
  if (data?.length > 0) {
    return data.map((creation) => (
      <Card creation={creation} fetchCreations={getSharedCreations} />
    ));
  }
  return (
    <h2 className='mt-5 font-bold text-main text-xl uppercase'>{title}</h2>
  );
};

const Showcase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sharedCreations, setSharedCreations] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    getSharedCreations();
  }, []);

  const getSharedCreations = async () => {
    setIsLoading(true);
    await fetchSharedCreations()
      .then((res) => {
        setSharedCreations(res.data.reverse());
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = sharedCreations.filter(
          (item) =>
            item.createdBy.name
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <div>
      <Navbar />
      <section className='max-w-7xl mx-auto p-4'>
        <div>
          <h1 className='font-extrabold text-[#222328] text-[32px]'>
            The Community Showcase
          </h1>
          <p className='mt-2 text-[#666e75] text-[16px]'>
            Browse through a captivating collection of images crafted by users
            and AI, exploring the intersection of creativity and technology.
          </p>
        </div>
        <div className='mt-16'>
          <FormField
            labelName='Search CreAItions'
            type='text'
            name='text'
            placeholder='Search CreAItions'
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>
        <div className='mt-10'>
          {isLoading ? (
            <div className='flex justify-center items-center'>
              <Loader />
            </div>
          ) : (
            <>
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
                    getSharedCreations={getSharedCreations}
                  />
                ) : (
                  <RenderCards
                    data={sharedCreations}
                    title='No creations found'
                    getSharedCreations={getSharedCreations}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Showcase;
