import axios from 'axios';

export const facebookLoginHandler = async (facebooktoken) => {
  return await axios.get(
    `${import.meta.env.VITE_API_URL}/facebook-login-handler/${facebooktoken}`
  );
};
