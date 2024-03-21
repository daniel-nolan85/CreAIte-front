import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { createStripeSubscription } from '../requests/stripe';
import { updateUserSubscription } from '../requests/user';

const PaymentForm = ({
  amount,
  setShowStripeModal,
  setShowPaymentCompletionModal,
  setCard,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const { token, _id, name, email, subscription } =
    useSelector((state) => state.user) || {};
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const createSubscription = async (e) => {
    e.preventDefault();
    try {
      const paymentMethod = await stripe.createPaymentMethod({
        card: elements.getElement('card'),
        type: 'card',
      });
      setCard(paymentMethod.paymentMethod.card);
      const paymentMethodId = paymentMethod.paymentMethod.id;
      console.log({ paymentMethod });
      await createStripeSubscription(
        token,
        name,
        email,
        amount,
        paymentMethodId
      )
        .then(async (res) => {
          console.log(res.data);
          const confirm = await stripe.confirmCardPayment(
            res.data.clientSecret
          );
          if (confirm.error) return toast.error('Payment unsuccessful!');
          await updateUserSubscription(token, _id, amount)
            .then((res) => {
              console.log(res.data);
              dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                  token,
                  _id: res.data._id,
                  email: res.data.email,
                  name: res.data.name,
                  bio: res.data.bio,
                  profileImage: res.data.profileImage,
                  coverImage: res.data.coverImage,
                  subscription: res.data.subscription,
                },
              });
              setShowStripeModal(false);
              setShowPaymentCompletionModal(true);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    } catch (err) {
      console.error(err);
      alert('Payment failed! ' + err.message);
    }
  };

  return (
    <form>
      <CardElement />
      <button
        disabled={isProcessing}
        onClick={createSubscription}
        className='bg-main w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'
      >
        {isProcessing ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
};

export default PaymentForm;
