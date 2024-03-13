const Keywords = ({ keywords }) => {
  const keywordsArray = keywords
    .split(',')
    .filter((keyword) => keyword.trim() !== '');

  return (
    <div>
      {keywordsArray.map((keyword, index) => (
        <span
          key={index}
          className='inline-block mb-2 mr-2 text-black bg-main font-medium rounded-full text-sm px-5 py-2.5 text-center mx-2'
        >
          {keyword}
        </span>
      ))}
    </div>
  );
};

export default Keywords;
