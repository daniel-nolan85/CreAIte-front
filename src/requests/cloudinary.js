import axios from 'axios';

export const uploadMediaToCloudinary = async (formData) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/upload-media`,
    formData
  );
};

export const destroyMediaFromCloudinary = async (authtoken, publicId) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/destroy-media`,
    { publicId },
    {
      headers: {
        authtoken,
      },
    }
  );
};
