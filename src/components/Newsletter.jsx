const Newsletter = () => {
  return (
    <div className='w-full py-16 bg-[#000300] text-white px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Stay in the loop with CreAIte
          </h1>
          <p>
            Enter your email to receive the latest news, updates, and exclusive
            offers straight to your inbox.
          </p>
        </div>
        <div className='my-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              type='email'
              placeholder='Enter email'
              className='p-3 flex w-full rounded-md text-black'
            />
            <button className='bg-main hover:bg-mainDark text-black w-[200px] rounded-md font-medium ml-4 my-6 px-6 py-3'>
              Notify Me
            </button>
          </div>
          <p>
            We care about the protection of your data. Read our{' '}
            <span className='text-main'>Privacy Policy.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
