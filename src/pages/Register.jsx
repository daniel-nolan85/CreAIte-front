import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { app } from '../../firebase';
import CoverImage from '../assets/cover-image.jpg';
import GoogleIcon from '../assets/google-icon.svg';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { createUser, googleUser } from '../requests/auth';
import LoaderBlack from '../components/LoaderBlack';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistration = async () => {
    setIsLoading(true);
    if (!name) {
      setIsLoading(false);
      toast.error('Please enter your full name');
      return;
    }
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
      setIsLoading(false);
      toast.error(
        'Password must be at least 6 characters and contain letters and numbers.'
      );
      return;
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user)
          .then(() => {
            toast.success(`A verification email has been sent to ${email}`);
            setName('');
            setEmail('');
            setPassword('');
            setIsLoading(false);
            const idToken = userCredential.user.accessToken;
            createUser(name, email);
          })
          .catch((err) => {
            console.error({ err });
            setIsLoading(false);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        const errorCode = err.code;
      });
  };

  const googleLogin = async () => {
    await signInWithPopup(auth, provider).then((userCredential) => {
      const user = userCredential.user;
      const idToken = user.accessToken;
      googleUser(user.displayName, user.email)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              token: idToken,
              _id: res.data._id,
              email: res.data.email,
              name: res.data.name,
              bio: res.data.bio,
              profileImage: res.data.profileImage,
              coverImage: res.data.coverImage,
              subscription: res.data.subscription,
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
            <h3 className='text-3xl font-semibold mb-2'>Sign Up</h3>
            <p className='text-base mb-2 text-black'>
              Ready to join us? Please provide your details to get started.
            </p>
          </div>

          <div className='w-full flex flex-col'>
            <input
              type='text'
              placeholder='Name'
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
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

          <div className='w-full flex items-center justify-between'>
            <div className='w-full flex items-center'>
              <input type='checkbox' className='w-4 h-4 mr-2' />
              <p className='text-sm text-black'>
                I agree to <span className='font-bold text-main'>Terms</span>{' '}
                and <span className='font-bold text-main'>Privacy Policy</span>
              </p>
            </div>
          </div>
          <div className='w-full flex flex-col my-4'>
            <button
              onClick={handleRegistration}
              className='w-full text-black my-2 font-semibold bg-main rounded-md p-4 text-center flex items-center justify-center'
            >
              {isLoading ? <LoaderBlack /> : 'Sign up'}
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
            Continue with Google
          </div>
        </div>

        <div className='w-full flex items-center justify-center'>
          <p className='text-sm font-normal text-black'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='font-semibold cursor-pointer text-main'
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
