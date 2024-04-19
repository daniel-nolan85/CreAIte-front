import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';
import { currentUser } from './requests/auth';
import { createOrFetchConversation } from './requests/conversations';
import {
  fetchMessages,
  sendMessage,
  incrementNewMessages,
  clearNewMessages,
} from './requests/messages';

import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';

import Landing from './pages/Landing';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Showcase from './pages/Showcase';
import Create from './pages/Create';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import Account from './pages/Account';
import Subscription from './pages/Subscription';
import Admin from './pages/Admin';
import Pulse from './components/Pulse';
import Modal from './components/Modal';
import Messenger from './components/Messenger';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';

const App = () => {
  const [showChatModal, setShowChatModal] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef(null);
  const socket = useRef();
  const isChatModalOpen = useRef(showChatModal);

  const { token, _id, role, name, profileImage } =
    useSelector((state) => state.user) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        const idToken = await user.accessToken;
        const email = user.email;
        currentUser(idToken, email)
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
              },
            });
          })
          .catch((err) => console.error(err));
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    socket.current = io(
      import.meta.env.VITE_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true },
      { secure: true }
    );
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.sender,
        content: data.message,
        createdAt: Date.now(),
      });
      if (!isChatModalOpen.current) {
        incNewMessages(data.receiverId);
      }
    });
  }, [showChatModal]);

  useEffect(() => {
    socket.current.emit('addUser', _id);
    socket.current.on('getUsers', (users) => {
      console.log({ users });
    });
  }, [token]);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.some(
        (member) => member._id === arrivalMessage.sender._id
      )
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    if (role && _id) {
      getConversations();
    }
  }, [role, _id]);

  useEffect(() => {
    if (currentChat) getMessages();
  }, [currentChat]);

  useEffect(() => {
    if (showChatModal) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showChatModal, messages]);

  const getConversations = async () => {
    try {
      const res = await createOrFetchConversation(token, _id);
      setCurrentChat(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getMessages = async () => {
    try {
      const res = await fetchMessages(token, currentChat._id);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    const message = {
      sender: _id,
      content: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await sendMessage(token, message);
      setMessages([...messages, res.data]);
      setNewMessage('');
      const receiver = currentChat.members.find((member) => member._id !== _id);
      socket.current.emit('sendMessage', {
        sender: { _id, name, profileImage },
        receiverId: receiver._id,
        message: message.content,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const incNewMessages = async (receiverId) => {
    await incrementNewMessages(receiverId)
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            token,
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
          },
        });
      })
      .catch((err) => console.error(err));
  };

  const handleOpenChatModal = async () => {
    setShowChatModal(true);
    isChatModalOpen.current = true;
    await clearNewMessages(_id)
      .then((res) => {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            token,
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
          },
        });
      })
      .catch((err) => console.error(err));
  };

  const handleCloseChatModal = () => {
    setShowChatModal(false);
    isChatModalOpen.current = false;
  };

  return (
    <BrowserRouter>
      <ToastContainer position='top-center' />
      {role && role === 'subscriber' && (
        <Pulse handleOpenChatModal={handleOpenChatModal} />
      )}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/showcase' element={<Showcase />} />
        <Route path='/user-profile/:userId' element={<UserProfile />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/cookies' element={<Cookies />} />
        <Route
          path='/admin'
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path='/creaite'
          element={
            <UserRoute>
              <Create />
            </UserRoute>
          }
        />
        <Route
          path='/profile/:userId'
          element={
            <UserRoute>
              <Profile />
            </UserRoute>
          }
        />
        <Route
          path='/account/:userId'
          element={
            <UserRoute>
              <Account />
            </UserRoute>
          }
        />
        <Route
          path='/subscription/:userId'
          element={
            <UserRoute>
              <Subscription />
            </UserRoute>
          }
        />
      </Routes>
      <Modal isVisible={showChatModal} onClose={handleCloseChatModal}>
        <div className='p-6 lg:px-8 text-left'>
          <h3 className='font-extrabold text-[32px]'>Chat Support</h3>
          <p className='mt-2 text-[#666e75] text-[16px]'>
            Feel free to type your message below and one of our admin team will
            assist you shortly. We're here to help!
          </p>
          <Messenger
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSubmit={handleSubmit}
            _id={_id}
            scrollRef={scrollRef}
          />
        </div>
      </Modal>
    </BrowserRouter>
  );
};

export default App;
