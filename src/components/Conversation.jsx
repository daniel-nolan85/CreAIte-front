import { useState, useEffect } from 'react';
import { FaCrown } from 'react-icons/fa';
import defaultProfile from '../assets/profile.svg';

const Conversation = ({ conversation, _id }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(conversation.members.find((m) => m !== _id));
  }, [conversation]);

  const { name, profileImage, subscription } = user || {};
  const { customerSupport } = subscription;

  return (
    <div className="conversation">
      {customerSupport === 'Priority' && (
        <FaCrown className="text-[#ffd700] text-4xl" />
      )}
      <img
        src={profileImage ? profileImage.url : defaultProfile}
        alt="user profile image"
        className="conversationImg"
      />
      <span className="conversationName">{name}</span>
    </div>
  );
};

export default Conversation;
