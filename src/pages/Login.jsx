import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
import { FaRegEye, FaRegEyeSlash, FaLongArrowAltLeft } from 'react-icons/fa';
import { loginUser, checkUserExists, googleUser } from '../requests/auth';
import { fetchCoverImage } from '../requests/creation';
import LoaderBlack from '../components/LoaderBlack';
import Modal from '../components/Modal';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUserNotFoundModal, setShowUserNotFoundModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [coverImage, setCoverImage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const intended = location.state;

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchCoverImage();
        setCoverImage(res.data[0].randomImage);
      } catch (error) {
        console.error(error);
        setCoverImage(CoverImage);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const loginIfAgreed = async () => {
      if (agreed) {
        await googleLogin();
      }
    };
    loginIfAgreed();
  }, [agreed]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      toast.error('Please enter a valid email');
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
          loginUser(idToken, email)
            .then((res) => {
              dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                  token: idToken,
                  _id: res.data._id,
                  role: res.data.role,
                  email: res.data.email,
                  name: res.data.name,
                  bio: res.data.bio,
                  profileImage: res.data.profileImage,
                  coverImage: res.data.coverImage,
                  subscription: res.data.subscription,
                  likes: res.data.likes,
                  downloads: res.data.downloads,
                  newMessages: res.data.newMessages,
                  monthlyAllocation: res.data.monthlyAllocation,
                  showCreAitionInstructions: res.data.showCreAitionInstructions,
                },
              });
              roleBasedRedirect(res);
            })
            .catch((err) => console.error({ err }));
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        const errorCode = err.code;
        if (errorCode === 'auth/invalid-credential') {
          toast.warning(
            "Oops! It seems there's an issue with your credentials. Please double-check and try again."
          );
        }
      });
  };

  const googleLogin = async () => {
    await signInWithPopup(auth, provider).then(async (userCredential) => {
      const user = userCredential.user;
      const idToken = user.accessToken;
      let userExistsResult;
      await checkUserExists(user.email).then((res) => {
        userExistsResult = res.data;
        if (!res.data.success && !agreed) {
          setShowUserNotFoundModal(true);
          return;
        }
      });

      if (userExistsResult.success || agreed) {
        googleUser(idToken, user.displayName, user.email)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                token: idToken,
                _id: res.data._id,
                role: res.data.role,
                email: res.data.email,
                name: res.data.name,
                bio: res.data.bio,
                profileImage: res.data.profileImage,
                coverImage: res.data.coverImage,
                subscription: res.data.subscription,
                likes: res.data.likes,
                downloads: res.data.downloads,
                newMessages: res.data.newMessages,
                monthlyAllocation: res.data.monthlyAllocation,
                showCreAitionInstructions: res.data.showCreAitionInstructions,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.error({ err }));
      }
    });
  };

  const roleBasedRedirect = (res) => {
    if (intended) {
      navigate(intended.to);
    } else {
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/showcase');
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative hidden lg:flex w-1/2 h-full flex-col">
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-[white] font-bold my-4">
            Transforming Words into Visual Magic
          </h1>
          <p className="text-xl text-white font-normal">Get started for free</p>
        </div>
        <img
          src={coverImage}
          alt="cover image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 h-full bg-white text-main flex flex-col p-20 justify-between items-center">
        <h1 className="w-full max-w-[500px] mx-auto text-3xl text-main font-semibold mr-auto">
          <Link to="/" className="flex items-center">
            <FaLongArrowAltLeft className="mr-2" /> CreAIte
          </Link>
        </h1>

        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">Log In</h3>
            <p className="text-base mb-2 text-black">
              Welcome back! Please enter your login details.
            </p>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute top-[20px] right-[10px]">
                <button onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <FaRegEyeSlash size={20} className="text-gray-500" />
                  ) : (
                    <FaRegEye size={20} className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-row-reverse">
            <p className="text-sm font-medium whitespace-nowrap cursor-pointer">
              Forgot password?
            </p>
          </div>
          <div className="w-full flex flex-col my-4">
            <button
              onClick={handleLogin}
              className="w-full text-black my-2 font-semibold bg-main rounded-md p-4 text-center flex items-center justify-center"
            >
              {isLoading ? <LoaderBlack /> : 'Log In'}
            </button>
          </div>

          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black"></div>
            <p className="text-lg absolute  bg-white mb-1 px-2 ">or</p>
          </div>
          <div
            onClick={googleLogin}
            className="w-full text-black my-6 font-semibold bg-white border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
          >
            <img src={GoogleIcon} alt="Google icon" className="h-6 mr-2" />
            Continue with Google
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold cursor-pointer text-main"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
      <Modal
        isVisible={showUserNotFoundModal}
        onClose={() => setShowUserNotFoundModal(false)}
      >
        <div className="p-6 lg:px-8 text-left">
          <h3 className="text-xl font-medium text-gray-900 mb-4">
            <p className="text-sm text-black">
              Do you agree to the{' '}
              <Link to="/terms">
                <span className="font-bold text-main cursor-pointer">
                  Terms
                </span>
              </Link>
              ,{' '}
              <Link to="/privacy">
                <span className="font-bold text-main cursor-pointer">
                  Privacy
                </span>
              </Link>
              , and{' '}
              <Link to="/cookies">
                <span className="font-bold text-main cursor-pointer">
                  Cookies{' '}
                </span>
              </Link>
              policies?
            </p>
          </h3>
          <div className="flex justify-between">
            <button
              onClick={() => {
                setAgreed(true);
                setShowUserNotFoundModal(false);
              }}
              className="bg-main hover:bg-mainDark w-[200px] rounded-md font-medium my-3 mx-auto py-3 text-black"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setShowUserNotFoundModal(false);
                toast.error(
                  'You must agree to the terms and policies in order to sign up'
                );
              }}
              className="bg-red hover:bg-redDark w-[200px] rounded-md font-medium my-3 mx-auto py-3 text-black"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
