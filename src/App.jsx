import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';

import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Showcase from './pages/Showcase';
import Create from './pages/Create';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';

const App = () => {
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        const idToken = await user.accessToken;
        currentUser(idToken).then((res) => {
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
            },
          }).catch((err) => console.error(err));
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  console.log({ user });

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/showcase' element={<Showcase />} />
        <Route path='/create' element={<Create />} />
        <Route path='/profile/:userId' element={<Profile />} />
        <Route path='/user-profile/:userId' element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
