import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from '../components/Navbar';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import Card from '../components/Card';
import {
  fetchSharedCreations,
  handleDownloadCreation,
  handleLikeCreation,
  handleUnlikeCreation,
} from '../requests/creation';

const RenderCards = ({
  data,
  title,
  handleDownload,
  handleLike,
  handleDislike,
}) => {
  if (data?.length > 0) {
    return data.map((creation) =>
      creation.photos.map((photo, index) => (
        <Card
          key={`${creation._id}_${index}`}
          creation={creation}
          photo={photo}
          handleDownload={handleDownload}
          handleLike={handleLike}
          handleDislike={handleDislike}
        />
      ))
    );
  }
  return (
    <h2 className="mt-5 font-bold text-main text-xl uppercase">{title}</h2>
  );
};

const Showcase = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sharedCreations, setSharedCreations] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getSharedCreations();
  }, [page]);

  const getSharedCreations = async () => {
    try {
      const res = await fetchSharedCreations(page);

      setSharedCreations([...sharedCreations, ...res.data.creations]);
      if (sharedCreations.length === res.data.totalCount) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = () => {
    const newPage = page + 1;
    setPage(newPage);
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

  const handleDownload = async (creationId, photo, userId) => {
    await handleDownloadCreation(creationId, photo, userId).then((res) => {
      setSharedCreations((prevCreations) => {
        return prevCreations.map((creation) => {
          if (creation._id === creationId) {
            return { ...creation, downloaded: true };
          }
          return creation;
        });
      });
    });
  };

  const handleLike = async (token, userId, creationId) => {
    await handleLikeCreation(token, userId, creationId).then((res) => {
      setSharedCreations((prevCreations) => {
        return prevCreations.map((creation) => {
          if (creation._id === creationId) {
            return { ...creation, liked: true };
          }
          return creation;
        });
      });
    });
  };

  const handleDislike = async (token, userId, creationId) => {
    await handleUnlikeCreation(token, userId, creationId).then((res) => {
      setSharedCreations((prevCreations) => {
        return prevCreations.map((creation) => {
          if (creation._id === creationId) {
            return { ...creation, liked: false };
          }
          return creation;
        });
      });
    });
  };

  return (
    <div>
      <Navbar />
      <section className="max-w-7xl mx-auto p-4">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">
            The Community Showcase
          </h1>
          <p className="mt-2 text-[#666e75] text-[16px]">
            Browse through a captivating collection of images crafted by users
            and AI, exploring the intersection of creativity and technology.
          </p>
        </div>
        <div className="mt-16">
          <FormField
            labelName="Search CreAItions"
            type="text"
            name="text"
            placeholder="Search CreAItions"
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>
        <div className="mt-10">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                  Showing results for{' '}
                  <span className="text-[#222328]">{searchText}</span>
                </h2>
              )}
              <InfiniteScroll
                dataLength={sharedCreations.length}
                next={fetchData}
                hasMore={hasMore}
                loader={
                  <div className="text-center py-8">
                    <Loader />
                  </div>
                }
                endMessage={
                  <h4 className="text-center font-bold text-main text-2xl py-8">
                    That's all for now! Check back later for new CreAItions.
                  </h4>
                }
              >
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3">
                  {searchText ? (
                    <RenderCards
                      data={searchedResults}
                      title="No search results found"
                      handleDownload={handleDownload}
                      handleLike={handleLike}
                      handleDislike={handleDislike}
                    />
                  ) : (
                    <RenderCards
                      data={sharedCreations}
                      title="No CreAItions found"
                      handleDownload={handleDownload}
                      handleLike={handleLike}
                      handleDislike={handleDislike}
                    />
                  )}
                </div>
              </InfiniteScroll>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Showcase;
