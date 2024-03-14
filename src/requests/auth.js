import axios from 'axios';

export const createUser = async (name, email) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/create-user`, {
    name,
    email,
  });
};

export const loginUser = async (email) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/login-user`, {
    email,
  });
};

export const googleUser = async (name, email) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/google-user`, {
    name,
    email,
  });
};

export const currentUser = async (authtoken, email) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/current-user`,
    { email },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const confirmUserEmail = async (authtoken, _id, email) => {
  return await axios.put(
    `${import.meta.env.VITE_API_URL}/confirm-user-email`,
    { _id, email },
    {
      headers: {
        authtoken,
      },
    }
  );
};
