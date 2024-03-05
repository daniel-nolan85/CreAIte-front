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
