import axios from 'axios';

export const fetchMessages = async (authtoken, conversationId) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/fetch-messages/${conversationId}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const sendMessage = async (authtoken, message) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/send-message`,
    {
      message,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const incrementNewMessages = async (receiverId) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/increment-new-messages`,
    {
      receiverId,
    }
  );
};

export const clearNewMessages = async (_id) => {
  return await axios.put(`${import.meta.env.VITE_API_URL}/clear-new-messages`, {
    _id,
  });
};
