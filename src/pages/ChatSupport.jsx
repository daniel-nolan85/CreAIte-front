import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import Navbar from '../components/Navbar';
import {
  fetchConversations,
  createOrFetchConversation,
} from '../requests/conversations';
import { fetchMessages, sendMessage } from '../requests/messages';
import AdminMessenger from '../components/AdminMessenger';
import Messenger from '../components/Messenger';

const ChatSupport = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const { token, _id, role } = useSelector((state) => state.user) || {};

  const scrollRef = useRef(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io(
      import.meta.env.VITE_SOCKET_IO,
      { path: '/socket.io' },
      { reconnection: true },
      { secure: true }
    );
    socket.current.on('getMessage', (data) => {
      console.log({ data });
      setArrivalMessage({
        sender: data.senderId,
        content: data.message,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit('addUser', _id);
    socket.current.on('getUsers', (users) => {
      console.log({ users });
    });
  }, [token]);

  console.log({ arrivalMessage });
  console.log({ currentChat });

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.some(
        (member) => member._id === arrivalMessage.sender
      )
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
      console.log({ messages });
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
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getConversations = async () => {
    try {
      if (role === 'admin') {
        const res = await fetchConversations(token);
        setConversations(res.data);
      } else {
        const res = await createOrFetchConversation(token, _id);
        setCurrentChat(res.data);
      }
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
        senderId: _id,
        receiverId: receiver._id,
        message: message.content,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <section className='max-w-7xl mx-auto p-4'>
        <div>
          <h1 className='font-extrabold text-[32px]'>Support</h1>
          <p className='mt-2 text-[#666e75] text-[16px]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            possimus aspernatur placeat quod repellat natus laboriosam delectus
            sed officia autem nisi, quo provident fuga consequuntur porro error
            nulla tempora illum perspiciatis sequi perferendis quos? Placeat
            ullam voluptate a ea, similique odio, nisi earum enim eos
            consectetur voluptatem expedita ducimus atque!
          </p>
        </div>
        {role === 'admin' ? (
          <AdminMessenger
            conversations={conversations}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSubmit={handleSubmit}
            _id={_id}
            scrollRef={scrollRef}
          />
        ) : (
          <Messenger
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSubmit={handleSubmit}
            _id={_id}
            scrollRef={scrollRef}
          />
        )}
      </section>
    </>
  );
};

export default ChatSupport;
