import axios from 'axios';

export const createImage = async (authtoken, prompt) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-image`,
    {
      prompt,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCreation = async (authtoken, form) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-creation`,
    {
      form,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchCreations = async (authtoken) => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/fetch-creations`, {
    headers: {
      authtoken,
    },
  });
};
