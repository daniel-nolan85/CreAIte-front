import axios from 'axios';

export const createStripeSubscription = async (
  authtoken,
  _id,
  name,
  email,
  amount,
  paymentMethodId
) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-stripe-subscription`,
    { _id, name, email, amount, paymentMethodId },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const cancelStripeSubscription = async (
  authtoken,
  _id,
  subscriptionId
) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/cancel-stripe-subscription`,
    { _id, subscriptionId },
    {
      headers: {
        authtoken,
      },
    }
  );
};
