import axios from 'axios';

export const fetchConversations = async (authtoken) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/fetch-conversations`,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createOrFetchConversation = async (authtoken, _id) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/create-or-fetch-conversation/${_id}`,
    {
      headers: {
        authtoken,
      },
    }
  );
};
