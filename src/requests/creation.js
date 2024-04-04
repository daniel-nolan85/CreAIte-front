import axios from 'axios';
import FileSaver from 'file-saver';

export const createPrompt = async (authtoken, gptVersion) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-prompt`,
    { gptVersion },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createImage = async (
  authtoken,
  _id,
  prompt,
  imageSize,
  dalleVersion,
  imagesRemaining
) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-image`,
    { _id, prompt, imageSize, dalleVersion, imagesRemaining },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCaption = async (authtoken, prompt, gptVersion) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-caption`,
    { prompt, gptVersion },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createKeywords = async (authtoken, prompt, gptVersion) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-keywords`,
    { prompt, gptVersion },
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
  dalleVersion
) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/save-creation`,
    { form, sharing, imageSize, dalleVersion },
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
