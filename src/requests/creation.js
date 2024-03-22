import axios from 'axios';
import FileSaver from 'file-saver';

export const createImage = async (
  authtoken,
  _id,
  prompt,
  imageSize,
  plan,
  imagesRemaining
) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-image`,
    { _id, prompt, imageSize, plan, imagesRemaining },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCaption = async (authtoken, prompt, plan) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-caption`,
    { prompt, plan },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createKeywords = async (authtoken, prompt, plan) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-keywords`,
    { prompt, plan },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const saveCreation = async (
  authtoken,
  form,
  sharing,
  imageSize,
  plan
) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/save-creation`,
    { form, sharing, imageSize, plan },
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

export const handleDownloadCreation = async (_id, photo) => {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
  return await axios.put(`${import.meta.env.VITE_API_URL}/download-creation`, {
    _id,
  });
};

export const handleLikeCreation = async (authtoken, userId, _id) => {
  return await axios.put(
    `${import.meta.env.VITE_API_URL}/like-creation`,
    { userId, _id },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const handleUnlikeCreation = async (authtoken, userId, _id) => {
  return await axios.put(
    `${import.meta.env.VITE_API_URL}/unlike-creation`,
    { userId, _id },
    {
      headers: {
        authtoken,
      },
    }
  );
};
