import Conversation from './Conversation';
import Message from './Message';
import send from '../assets/send.svg';

const AdminMessenger = ({
  conversations,
  currentChat,
  setCurrentChat,
  messages,
  newMessage,
  setNewMessage,
  handleSubmit,
  _id,
  scrollRef,
}) => {
  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input
            type="text"
            placeholder="Search for users"
            className="chatMenuInput"
          />
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)}>
              <Conversation conversation={c} _id={_id} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
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
                  className="w-30 mt-3 bg-main hover:bg-mainDark rounded-md px-5 py-2.5 flex justify-center items-center"
                  onClick={handleSubmit}
                >
                  <img src={send} height={25} width={25} />
                </button>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessenger;
