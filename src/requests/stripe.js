import axios from 'axios';

export const createStripeSubscription = async (
  authtoken,
  name,
  email,
  amount,
  paymentMethodId
) => {
  console.log({ name, email, amount, paymentMethodId });
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/create-stripe-subscription`,
    { name, email, amount, paymentMethodId },
    {
      headers: {
        authtoken,
      },
    }
  );
};
