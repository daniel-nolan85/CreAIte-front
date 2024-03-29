import defaultProfile from '../assets/profile.svg';

const ChatOnline = ({ own }) => {
  return (
    <div className='chatOnline'>
      <div className='chatOnlineFriend'>
        <div className='chatOnlineImgContainer'>
          <img
            className='chatOnlineImg'
            src={defaultProfile}
            alt='user profile image'
          />
          <div className='chatOnlineBadge'></div>
        </div>
        <span className='chatOnlineName'>John Doe</span>
      </div>
    </div>
  );
};

export default ChatOnline;
