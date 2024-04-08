import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { fetchConversations } from '../../requests/conversations';
import { fetchMessages, sendMessage } from '../../requests/messages';
import AdminMessenger from '../AdminMessenger';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const { token, _id, role, name, profileImage } =
    useSelector((state) => state.user) || {};

  const scrollRef = useRef(null);
  const socket = useRef();

  console.log({ socket });

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
        sender: data.sender,
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
  }, [currentChat]);

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
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getConversations = async () => {
    try {
      const res = await fetchConversations(token);
      setConversations(res.data);
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
  return (
    <section className='w-full p-4'>
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
    </section>
  );
};

export default Messages;
