import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { createStripeSubscription } from '../requests/stripe';
import { updateUserSubscription } from '../requests/user';

const PaymentForm = ({
  amount,
  planType,
  customOptions,
  setCustomOptions,
  setShowStripeModal,
  setShowPaymentCompletionModal,
  setCard,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);

  const { token, _id, name, email } = useSelector((state) => state.user) || {};
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const handleCardChange = (event) => {
    setIsCardComplete(event.complete);
  };

  const createSubscription = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const paymentMethod = await stripe.createPaymentMethod({
        card: elements.getElement('card'),
        type: 'card',
      });
      setCard(paymentMethod.paymentMethod.card);
      const paymentMethodId = paymentMethod.paymentMethod.id;
      await createStripeSubscription(
        token,
        _id,
        name,
        email,
        amount,
        paymentMethodId
      )
        .then(async (res) => {
          console.log({ res });
          const confirm = await stripe.confirmCardPayment(
            res.data.clientSecret
          );
          if (confirm.error) return toast.error('Payment unsuccessful!');
          await updateUserSubscription(
            token,
            _id,
            amount,
            planType,
            customOptions,
            res.data.subscriptionId
          )
            .then((res) => {
              dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                  token,
                  _id: res.data._id,
                  role: res.data.role,
                  email: res.data.email,
                  name: res.data.name,
                  bio: res.data.bio,
                  profileImage: res.data.profileImage,
                  coverImage: res.data.coverImage,
                  subscription: res.data.subscription,
                  likes: res.data.likes,
                  downloads: res.data.downloads,
                  newMessages: res.data.newMessages,
                  monthlyAllocation: res.data.monthlyAllocation,
                  showCreAitionInstructions: res.data.showCreAitionInstructions,
                },
              });
              setShowStripeModal(false);
              setShowPaymentCompletionModal(true);
              setCustomOptions({
                dallEVersion: 'Select',
                gptVersion: 'Select',
                customerSupport: 'Select',
                numCreAItions: null,
              });
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err))
        .finally(() => setIsProcessing(false));
    } catch (err) {
      console.error(err);
      toast.error('Payment failed! ' + err.message);
      setIsProcessing(false);
    }
  };

  return (
    <form>
      <CardElement onChange={handleCardChange} />
      <button
        disabled={isProcessing || !isCardComplete}
        onClick={createSubscription}
        className={`w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black ${
          isProcessing || !isCardComplete
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-main hover:bg-mainDark'
        }`}
      >
        {isProcessing ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
};

export default PaymentForm;
