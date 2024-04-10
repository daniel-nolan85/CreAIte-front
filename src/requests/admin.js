import axios from 'axios';

export const fetchData = async (authtoken) => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/fetch-data`, {
    headers: {
      authtoken,
    },
  });
};

export const fetchAllUsers = async (authtoken) => {
  return await axios.get(`${import.meta.env.VITE_API_URL}/fetch-users`, {
    headers: {
      authtoken,
    },
  });
};
