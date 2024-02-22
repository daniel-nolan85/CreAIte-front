import { ReactTyped } from 'react-typed';

const Hero = () => {
  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2 uppercase'>
          Unleash the Power of AI for Your Creative Needs
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Welcome to CreAIte
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold pr-2 md:pr-4 py-4'>
            Effortlessly craft
          </p>
          <ReactTyped
            className='md:text-5xl sm:text-4xl text-xl font-bold'
            strings={[
              'posters',
              'ads',
              'posts',
              'graphics',
              'logos',
              'banners',
            ]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className='md-text-2xl text-xl font-bold text-gray-500'>
          Let&apos;s turn your words into magic
        </p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
