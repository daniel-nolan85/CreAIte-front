import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase';
import FlyoutLink from './FlyoutLink';
import defaultProfile from '../assets/profile.svg';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const auth = getAuth();

  const logout = async () => {
    await signOut(auth);
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    navigate('/');
  };

  const profileContent = () => {
    return (
      <div className='w-64 bg-white p-6 shadow-xl text-[#000300]'>
        <div className='mb-3 space-y-3 '>
          <h3 className='font-semibold'>User Settings</h3>
          <Link
            to={`/profile/${user._id}`}
            className='block text-sm hover:underline'
          >
            Profile
          </Link>
          <Link
            to={`/account/${user._id}`}
            className='block text-sm hover:underline'
          >
            My Account
          </Link>
        </div>
        <div className='mb-6 space-y-3 '>
          <h3 className='font-semibold'>Billing Settings</h3>
          <Link
            to={`/subscription/${user._id}`}
            className='block text-sm hover:underline'
          >
            Subscription
          </Link>
        </div>
        <button
          onClick={logout}
          className='w-full rounded-lg border-2 border-main px-4 py-2 font-semibold transition-colors hover:bg-main hover:text-black'
        >
          Logout
        </button>
      </div>
    );
  };

  return (
    <div className='bg-[#000300] relative z-10'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white '>
        <Link to='/'>
          <h1 className='w-full text-3xl font-bold text-main cursor-pointer'>
            CreAIte
          </h1>
        </Link>
        <ul className='hidden md:flex uppercase text-main'>
          <FlyoutLink href='/showcase'>
            <li className='p-4 cursor-pointer'>Showcase</li>
          </FlyoutLink>
          <FlyoutLink href='/about'>
            <li className='p-4 cursor-pointer'>About</li>
          </FlyoutLink>
          <FlyoutLink href='/contact'>
            <li className='p-4 cursor-pointer'>Contact</li>
          </FlyoutLink>
          {!user ? (
            <>
              <FlyoutLink href='/login'>
                <li className='p-4 cursor-pointer'>Login</li>
              </FlyoutLink>
              <FlyoutLink href='/signup'>
                <li className='p-4 cursor-pointer'>Signup</li>
              </FlyoutLink>
            </>
          ) : (
            <>
              <FlyoutLink href='/create'>
                <li className='font-medium bg-main text-black px-4 py-2 mt-2 rounded-md cursor-pointer'>
                  Create
                </li>
              </FlyoutLink>
              <div className='ml-4 pt-1'>
                <FlyoutLink
                  href={`/profile/${user._id}`}
                  FlyoutContent={profileContent}
                >
                  <img
                    src={
                      user.profileImage ? user.profileImage.url : defaultProfile
                    }
                    alt={`${user.name}'s profile picture`}
                    className='w-12 rounded-full'
                  />
                </FlyoutLink>
              </div>
            </>
          )}
        </ul>
        <div onClick={handleNav} className='block md:hidden cursor-pointer'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div
          className={
            nav
              ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
              : 'fixed left-[-100%] top-0 ease-in-out duration-500'
          }
        >
          <h1 className='w-full text-3xl font-bold text-main m-4 py-4'>
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
    </div>
  );
};

export default Navbar;
