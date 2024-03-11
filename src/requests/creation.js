import axios from 'axios';

export const createImage = async (authtoken, prompt) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-image`,
    { prompt },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCaption = async (authtoken, prompt) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-caption`,
    { prompt },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createKeywords = async (authtoken, prompt) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-keywords`,
    { prompt },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const saveCreation = async (authtoken, form, sharing) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/save-creation`,
    { form, sharing },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchSharedCreations = async () => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/fetch-shared-creations`
  );
};

export const fetchUserCreations = async (authtoken, _id) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/fetch-user-creations`,
    { _id },
    {
      headers: {
        authtoken,
      },
    }
  );
};
