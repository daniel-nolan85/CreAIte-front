import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import FormField from '../FormField';
import Card from '../Card';
import Loader from '../Loader';
import { fetchAllCreations } from '../../requests/creation';

const tabs = ['All', 'Shared', 'Private'];

const RenderCards = ({ data, title, getUserCreations }) => {
  if (data?.length > 0) {
    return data.map((creation) =>
      creation.photos.map((photo, index) => (
        <Card
          key={`${creation._id}_${index}`}
          creation={creation}
          photo={photo}
          personalProfile
          fetchCreations={getUserCreations}
        />
      ))
    );
  }
  return (
    <h2 className="mt-5 font-bold text-main text-xl uppercase">{title}</h2>
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
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: 'spring', duration: 0.5 }}
          className="absolute inset-0 z-0 bg-main rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

const CreAItions = () => {
  const [allCreations, setAllCreations] = useState(null);
  const [sharedCreations, setSharedCreations] = useState(null);
  const [privateCreations, setPrivateCreations] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [showShared, setShowShared] = useState(true);
  const [showPrivate, setShowPrivate] = useState(true);
  const [selected, setSelected] = useState(tabs[0]);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { token, _id } = useSelector((state) => state.user) || {};

  useEffect(() => {
    if (_id) {
      getAllCreations();
    }
  }, [_id]);

  useEffect(() => {
    if (selected === 'All') {
      setShowAll(true);
      setShowShared(false);
      setShowPrivate(false);
    } else if (selected === 'Shared') {
      setShowShared(true);
      setShowAll(false);
      setShowPrivate(false);
    } else {
      setShowPrivate(true);
      setShowAll(false);
      setShowShared(false);
    }
  }, [selected]);

  const getAllCreations = async () => {
    await fetchAllCreations(token, _id)
      .then((res) => {
        setAllCreations(res.data);
        setSharedCreations(
          res.data.filter((creation) => creation.sharing === true)
        );
        setPrivateCreations(
          res.data.filter((creation) => creation.sharing === false)
        );
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
        let searchResults;
        showAll &&
          (searchResults = allCreations.filter((item) =>
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
          ));
        showShared &&
          (searchResults = sharedCreations.filter((item) =>
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
          ));
        showPrivate &&
          (searchResults = privateCreations.filter((item) =>
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
          ));
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  return (
    <section className="w-full p-4 bg-white">
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="px-4 flex items-center flex-wrap gap-2">
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

          <div className="container w-full py-4 mt-8">
            <FormField
              labelName={`${
                showAll
                  ? 'Search all CreAItions'
                  : showShared
                  ? 'Search all shared CreAItions'
                  : showPrivate && 'Search all private CreAItions'
              }`}
              type="text"
              name="text"
              placeholder={`${
                showAll
                  ? 'Search all CreAItions'
                  : showShared
                  ? 'Search all shared CreAItions'
                  : showPrivate && 'Search all private CreAItions'
              }`}
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

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                  getAllCreations={getAllCreations}
                />
              ) : (
                <RenderCards
                  data={
                    showAll
                      ? allCreations
                      : showShared
                      ? sharedCreations
                      : showPrivate && privateCreations
                  }
                  title="No creations found"
                  getAllCreations={getAllCreations}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CreAItions;
