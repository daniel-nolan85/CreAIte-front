import axios from 'axios';

export const createUser = async (authtoken, name, email) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-user`,
    {
      name,
      email,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const loginUser = async (authtoken, email) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/login-user`,
    {
      email,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const googleUser = async (authtoken, name, email) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/google-user`,
    {
      name,
      email,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
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

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/current-admin`,
    {},
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
