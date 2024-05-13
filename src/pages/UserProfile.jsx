import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navbar from '../components/Navbar';
import PageLoader from '../components/PageLoader';
import FormField from '../components/FormField';
import Card from '../components/Card';
import Loader from '../components/Loader';
import defaultProfile from '../assets/profile.svg';
import {
  fetchUserCreations,
  handleDownloadCreation,
  handleLikeCreation,
  handleUnlikeCreation,
} from '../requests/creation';
import { fetchUser } from '../requests/user';

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

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [thisUser, setThisUser] = useState({});
  const [userCreations, setUserCreations] = useState([]);
  const [totalUserCreations, setTotalUserCreations] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { token } = useSelector((state) => state.user) || {};

  const { userId } = useParams();

  useEffect(() => {
    getUser();
  }, [token]);

  useEffect(() => {
    getUserCreations();
  }, [page]);

  const getUser = async () => {
    await fetchUser(userId)
      .then((res) => {
        setThisUser(res.data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  };

  const getUserCreations = async () => {
    try {
      const res = await fetchUserCreations(userId, page);
      setTotalUserCreations(res.data.totalCount);
      setUserCreations([...userCreations, ...res.data.creations]);
      if (userCreations.length === res.data.totalCount) {
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
        const searchResults = userCreations.filter((item) =>
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  const handleDownload = async (creationId, photo, userId) => {
    await handleDownloadCreation(creationId, photo, userId).then((res) => {
      setUserCreations((prevCreations) => {
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
      setUserCreations((prevCreations) => {
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
      setUserCreations((prevCreations) => {
        return prevCreations.map((creation) => {
          if (creation._id === creationId) {
            return { ...creation, liked: false };
          }
          return creation;
        });
      });
    });
  };

  if (!thisUser || !userCreations) {
    return <PageLoader />;
  }

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col items-center justify-center py-4">
          <div className="container rounded shadow-lg bg-white">
            {thisUser.coverImage ? (
              <img
                src={thisUser.coverImage.url}
                alt={`${thisUser.name}'s cover image`}
                className="w-full md:h-64 lg:h-96 xl:h-128 rounded rounded-b-none"
              />
            ) : (
              <div className="w-full h-32 md:h-64 lg:h-96 xl:h-128 rounded rounded-b-none bg-main" />
            )}
            <div className="flex justify-between">
              <div className="p-4">
                <img
                  src={
                    thisUser.profileImage
                      ? thisUser.profileImage.url
                      : defaultProfile
                  }
                  alt={`${thisUser.name}'s profile picture`}
                  className="w-32 h-32 rounded-full border-4 border-white mr-8 -mt-16 bg-white"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    {thisUser.name}
                  </h1>
                  <p className="text-gray-500">
                    Software Engineer at Nolancode
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-400 my-2 mx-4" style={{ height: 1 }}></div>
            <div className="p-4">
              <p className="text-gray-800">
                <b>{totalUserCreations}</b> CreAItions
              </p>
            </div>
          </div>
          <div className="container w-full py-4 mt-8">
            <FormField
              labelName="Search creations"
              type="text"
              name="text"
              placeholder="Search creations"
              value={searchText}
              handleChange={handleSearchChange}
            />
          </div>
          <div className="container w-full py-4">
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for{' '}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <InfiniteScroll
              dataLength={userCreations.length}
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
                    data={userCreations}
                    title="No CreAItions found"
                    handleDownload={handleDownload}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                  />
                )}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
