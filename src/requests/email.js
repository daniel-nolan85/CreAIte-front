import axios from 'axios';

export const checkRecaptcha = async (token, secret) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/recaptcha`, {
    token,
    secret,
  });
};

export const sendUserEmail = async (form) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/send-user-email`, {
    form,
  });
};
