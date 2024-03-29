import moment from 'moment';
import defaultProfile from '../assets/profile.svg';

const Message = ({ message, own }) => {
  const { profileImage } = message.sender;
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className='messageTop'>
        <img
          src={profileImage ? profileImage.url : defaultProfile}
          alt='user profile image'
          className='messageImg'
        />
        <p className='messageText'>{message.content}</p>
      </div>
      <div className='messageBottom'>{moment(message.createdAt).fromNow()}</div>
    </div>
  );
};

export default Message;
