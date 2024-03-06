import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { app } from '../../firebase';
import CoverImage from '../assets/cover-image.jpg';
import GoogleIcon from '../assets/google-icon.svg';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { loginUser, googleUser } from '../requests/auth';
import LoaderWhite from '../components/LoaderWhite';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('danielnolan85@yahoo.com');
  const [password, setPassword] = useState('Lennon1027');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      toast.error('Please enter a vaild email');
      return;
    }
    if (
      password.length < 6 ||
      !/\d/.test(password) ||
      !/[a-zA-Z]/.test(password)
    ) {
      toast.error(
        'Password must be at least 6 characters and contain letters and numbers.'
      );
      setIsLoading(false);
      return;
    }

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
          const idToken = user.accessToken;
          loginUser(email)
            .then((res) => {
              console.log('res => ', res.data);
              dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                  token: idToken,
                  _id: res.data._id,
                  email: res.data.email,
                  name: res.data.name,
                },
              });
              navigate('/showcase');
            })
            .catch((err) => console.error({ err }));
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        const errorCode = err.code;
      });
  };

  const googleLogin = async () => {
    await signInWithPopup(auth, provider).then((userCredential) => {
      console.log({ userCredential });
      const user = userCredential.user;
      const idToken = user.accessToken;
      googleUser(user.displayName, user.email)
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              token: idToken,
              _id: res.data._id,
              email: res.data.email,
              name: res.data.name,
            },
          });
          navigate('/showcase');
        })
        .catch((err) => console.error({ err }));
    });
  };

  return (
    <div className='w-full h-screen flex items-start'>
      <div className='relative hidden lg:flex w-1/2 h-full flex-col'>
        <div className='absolute top-[20%] left-[10%] flex flex-col'>
          <h1 className='text-4xl text-[white] font-bold my-4'>
            Transforming Words into Visual Magic
          </h1>
          <p className='text-xl text-white font-normal'>Get started for free</p>
        </div>
        <img
          src={CoverImage}
          alt='cover image'
          className='w-full h-full object-cover'
        />
      </div>

      <div className='w-full lg:w-1/2 h-full bg-white text-main flex flex-col p-20 justify-between items-center'>
        <h1 className='w-full max-w-[500px] mx-auto text-3xl text-main font-semibold mr-auto'>
          <Link to='/'> CreAIte</Link>
        </h1>

        <div className='w-full flex flex-col max-w-[500px]'>
          <div className='w-full flex flex-col mb-2'>
            <h3 className='text-3xl font-semibold mb-2'>Log In</h3>
            <p className='text-base mb-2 text-black'>
              Welcome back! Please enter your login details.
            </p>
          </div>

          <div className='w-full flex flex-col'>
            <input
              type='email'
              placeholder='Email'
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='absolute top-[20px] right-[10px]'>
                <button onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <FaRegEyeSlash size={20} className='text-gray-500' />
                  ) : (
                    <FaRegEye size={20} className='text-gray-500' />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className='w-full flex flex-row-reverse'>
            <p className='text-sm font-medium whitespace-nowrap cursor-pointer'>
              Forgot password?
            </p>
          </div>
          <div className='w-full flex flex-col my-4'>
            <button
              onClick={handleLogin}
              className='w-full text-black my-2 font-semibold bg-main rounded-md p-4 text-center flex items-center justify-center'
            >
              {isLoading ? <LoaderWhite /> : 'Log in'}
            </button>
          </div>

          <div className='w-full flex items-center justify-center relative py-2'>
            <div className='w-full h-[1px] bg-black'></div>
            <p className='text-lg absolute  bg-white mb-1 px-2 '>or</p>
          </div>
          <div
            onClick={googleLogin}
            className='w-full text-black my-6 font-semibold bg-white border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer'
          >
            <img src={GoogleIcon} alt='Google icon' className='h-6 mr-2' />
            Sign in with Google
          </div>
        </div>

        <div className='w-full flex items-center justify-center'>
          <p className='text-sm font-normal text-[#060606]'>
            Don&apos;t have an account?{' '}
            <Link
              to='/signup'
              className='font-semibold cursor-pointer text-main'
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
