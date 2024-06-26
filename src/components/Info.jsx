import Laptop from '../assets/laptop.jpg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Info = () => {
  const { token } = useSelector((state) => state.user) || {};

  return (
    <div id='info' className='w-full bg-[#f3fcfd] py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img src={Laptop} alt='/' className='w-[500px] mx-auto my-4' />
        <div className='flex flex-col justify-center'>
          <p className='text-main font-bold uppercase'>
            Unlock the power of AI Creativity
          </p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Transforming Words into Visual Magic
          </h1>
          <p>
            At CreAIte, we harness the boundless potential of artificial
            intelligence to empower you to unleash your creativity like never
            before. Our platform allows users to effortlessly generate stunning
            images from simple prompts, transforming your ideas into captivating
            visuals. Whether you&apos;re a seasoned designer or just starting
            out, our AI-powered tools provide endless inspiration and
            possibilities. Need a starting point? Dive into our &apos;Surprise
            Me&apos; prompts for instant creative sparks. Let CreAIte be your
            partner in turning imagination into reality, one pixel at a time.
          </p>
          <button className='bg-black hover:bg-[#1a1a1a] text-main w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>
            {token ? (
              <Link to='/creaite'>Get Started</Link>
            ) : (
              <Link to={'/login'} state={{ to: '/creaite' }}>
                Get Started
              </Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
