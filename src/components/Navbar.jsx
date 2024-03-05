import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '../../firebase';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log({ user });

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

  return (
    <div className='bg-[#000300]'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white '>
        <h1 className='w-full text-3xl font-bold text-main cursor-pointer'>
          CreAIte
        </h1>
        <ul className='hidden md:flex uppercase'>
          <Link to='/about'>
            <li className='p-4 cursor-pointer'>About</li>
          </Link>
          <Link to='/contact'>
            <li className='p-4 cursor-pointer'>Contact</li>
          </Link>
          {!user ? (
            <>
              <Link to='/login'>
                <li className='p-4 cursor-pointer'>Login</li>
              </Link>
              <Link to='/signup'>
                <li className='p-4 cursor-pointer'>Signup</li>
              </Link>
            </>
          ) : (
            <>
              <Link to='/create'>
                <li className='font-medium bg-main text-white px-4 py-2 mt-2 rounded-md cursor-pointer'>
                  Create
                </li>
              </Link>
              <li className='p-4 cursor-pointer' onClick={logout}>
                Logout
              </li>
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
