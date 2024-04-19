import Message from './Message';
import send from '../assets/send.svg';

const Messenger = ({
  messages,
  newMessage,
  setNewMessage,
  handleSubmit,
  _id,
  scrollRef,
}) => {
  return (
    <div className="messenger">
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            {messages.map((m) => (
              <div ref={scrollRef}>
                <Message message={m} own={m.sender._id === _id} />
              </div>
            ))}
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="Write a message"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            <button
              className="w-30 mt-3 ml-3 bg-main hover:bg-mainDark rounded-md px-5 py-2.5 flex justify-center items-center"
              onClick={handleSubmit}
            >
              <img src={send} height={25} width={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
