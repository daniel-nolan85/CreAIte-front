import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a] cursor-pointer'>
        CreAIte
      </h1>
      <ul className='hidden md:flex uppercase'>
        <Link to='/about'>
          <li className='p-4 cursor-pointer'>About</li>
        </Link>
        <Link to='/contact'>
          <li className='p-4 cursor-pointer'>Contact</li>
        </Link>
        <Link to='/login'>
          <li className='p-4 cursor-pointer'>Login</li>
        </Link>
        <Link to='/signup'>
          <li className='p-4 cursor-pointer'>Signup</li>
        </Link>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'fixed left-[-100%] top-0 ease-in-out duration-500'
        }
      >
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4 py-4'>
          CreAIte
        </h1>

        <ul className='uppercase p-4'>
          <Link to='/about'>
            <li className='p-4 cursor-pointer border-b border-gray-600'>
              About
            </li>
          </Link>
          <Link to='/contact'>
            <li className='p-4 cursor-pointer border-b border-gray-600'>
              Contact
            </li>
          </Link>
          <Link to='/login'>
            <li className='p-4 cursor-pointer border-b border-gray-600'>
              Login
            </li>
          </Link>
          <Link to='/signup'>
            <li className='p-4 cursor-pointer'>Signup</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
