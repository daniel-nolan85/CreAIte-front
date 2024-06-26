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

  const { _id, profileImage, name, role } =
    useSelector((state) => state.user) || {};

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
      <div className="w-64 bg-white p-6 shadow-xl text-[#000300]">
        <div className="mb-3 space-y-3 ">
          <h3 className="font-semibold">User Settings</h3>
          <Link
            to={`/profile/${_id}`}
            className="block text-sm hover:text-main"
          >
            Profile
          </Link>
          <Link
            to={`/account/${_id}`}
            className="block text-sm hover:text-main"
          >
            My Account
          </Link>
        </div>
        <div className="mb-6 space-y-3 ">
          <h3 className="font-semibold">Billing Settings</h3>
          <Link
            to={`/subscription/${_id}`}
            className="block text-sm hover:text-main"
          >
            Subscription
          </Link>
        </div>
        {role === 'admin' && (
          <div className="mb-6 space-y-3 ">
            <h3 className="font-semibold">Admin Settings</h3>
            <Link to="/admin" className="block text-sm hover:text-main">
              Dashboard
            </Link>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full rounded-lg border-2 border-main px-4 py-2 font-semibold transition-colors hover:bg-main hover:text-black"
        >
          Logout
        </button>
      </div>
    );
  };

  return (
    <div className="bg-[#000300] relative z-10">
      <div className="flex justify-between items-center h-24 max-w-7xl mx-auto px-4 text-white ">
        <Link to="/">
          <h1 className="w-full text-3xl font-bold text-main cursor-pointer">
            CreAIte
          </h1>
        </Link>
        <ul className="hidden md:flex uppercase text-main">
          <FlyoutLink href="/showcase">
            <li className="p-4 cursor-pointer">Showcase</li>
          </FlyoutLink>
          <FlyoutLink href="/about">
            <li className="p-4 cursor-pointer">About</li>
          </FlyoutLink>
          <FlyoutLink href="/contact">
            <li className="p-4 cursor-pointer">Contact</li>
          </FlyoutLink>
          {!_id ? (
            <>
              <FlyoutLink href="/login">
                <li className="p-4 cursor-pointer">Login</li>
              </FlyoutLink>
              <FlyoutLink href="/signup">
                <li className="p-4 cursor-pointer">Signup</li>
              </FlyoutLink>
            </>
          ) : (
            <>
              <FlyoutLink href="/creaite">
                <li className="font-medium bg-main hover:bg-mainDark text-black px-4 py-2 mt-2 rounded-md cursor-pointer">
                  Creaite
                </li>
              </FlyoutLink>
              <div className="ml-4 pt-1">
                <FlyoutLink href="#" FlyoutContent={profileContent}>
                  <img
                    src={profileImage ? profileImage.url : defaultProfile}
                    alt={`${name}'s profile picture`}
                    className="w-12 rounded-full"
                  />
                </FlyoutLink>
              </div>
            </>
          )}
        </ul>
        <div onClick={handleNav} className="block md:hidden cursor-pointer">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div
          className={
            nav
              ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
              : 'fixed left-[-100%] top-0 ease-in-out duration-500'
          }
        >
          <h1 className="w-full text-3xl font-bold text-main m-4 py-4">
            CreAIte
          </h1>

          <ul className="uppercase p-4">
            <Link to="/showcase">
              <li className="p-4 cursor-pointer border-b border-gray-600">
                Showcase
              </li>
            </Link>
            <Link to="/about">
              <li className="p-4 cursor-pointer border-b border-gray-600">
                About
              </li>
            </Link>
            <Link to="/contact">
              <li className="p-4 cursor-pointer border-b border-gray-600">
                Contact
              </li>
            </Link>
            {!_id ? (
              <>
                <Link to="/login">
                  <li className="p-4 cursor-pointer border-b border-gray-600">
                    Login
                  </li>
                </Link>
                <Link to="/signup">
                  <li className="p-4 cursor-pointer">Signup</li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/creaite">
                  <li className="font-medium bg-main hover:bg-mainDark text-black px-4 py-2 mt-4 rounded-md cursor-pointer">
                    Creaite
                  </li>
                </Link>
                <div className="ml-4 pt-4">
                  <FlyoutLink href="#" FlyoutContent={profileContent}>
                    <img
                      src={profileImage ? profileImage.url : defaultProfile}
                      alt={`${name}'s profile picture`}
                      className="w-12 rounded-full"
                    />
                  </FlyoutLink>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
