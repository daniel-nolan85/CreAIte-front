import axios from 'axios';

export const fetchUser = async (_id) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/fetch-user`, {
    _id,
  });
};

export const updateUserProfile = async (authtoken, _id, name, bio) => {
  return await axios.put(
    `${import.meta.env.VITE_API_URL}/update-profile`,
    { _id, name, bio },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateUserProfileImage = async (authtoken, _id, profileImage) => {
  return await axios.put(
    `${import.meta.env.VITE_API_URL}/update-profile-image`,
    { _id, profileImage },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateUserCoverImage = async (authtoken, _id, coverImage) => {
  return await axios.put(
    `${import.meta.env.VITE_API_URL}/update-cover-image`,
    { _id, coverImage },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateUserSubscription = async (
  authtoken,
  _id,
  amount,
  planType,
  customOptions,
  subscriptionId
) => {
  return await axios.put(
    `${import.meta.env.VITE_API_URL}/update-subscription`,
    { _id, amount, planType, customOptions, subscriptionId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const captureUserEmail = async (email) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/capture-user-email`,
    {
      email,
    }
  );
};

export const acknowledgeCreAItionInstructions = async (authtoken, _id) => {
  return await axios.put(
    `${import.meta.env.VITE_API_URL}/acknowledge-creAItion-instructions`,
    { _id },
    {
      headers: {
        authtoken,
      },
    }
  );
};
