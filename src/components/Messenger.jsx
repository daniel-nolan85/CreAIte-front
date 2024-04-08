import Message from './Message';

const Messenger = ({
  messages,
  newMessage,
  setNewMessage,
  handleSubmit,
  _id,
  scrollRef,
}) => {
  return (
    <div className='messenger'>
      <div className='chatBox'>
        <div className='chatBoxWrapper'>
          <div className='chatBoxTop'>
            {messages.map((m) => (
              <div ref={scrollRef}>
                <Message message={m} own={m.sender._id === _id} />
              </div>
            ))}
          </div>
          <div className='chatBoxBottom'>
            <textarea
              className='chatMessageInput'
              placeholder='Write a message'
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            <button className='chatSubmitButton' onClick={handleSubmit}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
