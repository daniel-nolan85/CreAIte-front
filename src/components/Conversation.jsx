import { useState, useEffect } from 'react';
import defaultProfile from '../assets/profile.svg';

const Conversation = ({ conversation, _id }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(conversation.members.find((m) => m !== _id));
  }, [conversation]);

  const { name, profileImage } = user || {};

  return (
    <div className='conversation'>
      <img
        src={profileImage ? profileImage.url : defaultProfile}
        alt='user profile image'
        className='conversationImg'
      />
      <span className='conversationName'>{name}</span>
    </div>
  );
};

export default Conversation;
