import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import moment from 'moment';
import Navbar from '../components/Navbar';
import PageLoader from '../components/PageLoader';
import FreeCard from '../components/FreeCard';
import DeluxeCard from '../components/DeluxeCard';
import PremiumCard from '../components/PremiumCard';
import CustomCard from '../components/CustomCard';
import Modal from '../components/Modal';
import PaymentForm from '../components/PaymentForm';
import CreditCard from '../components/CreditCard';
import LoaderBlack from '../components/LoaderBlack';
import { cancelStripeSubscription } from '../requests/stripe';
import DeluxeCardMini from '../components/DeluxeCardMini';
import PremiumCardMini from '../components/PremiumCardMini';
import CustomOptions from '../components/CustomOptions';

const Subscription = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPersonalizeModal, setShowPersonalizeModal] = useState(false);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [showPaymentCompletionModal, setShowPaymentCompletionModal] =
    useState(false);
  const [showCancelSubscriptionModal, setShowCancelSubscriptionModal] =
    useState(false);
  const [amount, setAmount] = useState();
  const [stripePromise, setStripePromise] = useState(null);
  const [card, setCard] = useState({});
  const [isCancelling, setIsCancelling] = useState(false);
  const [planType, setPlanType] = useState('');
  const [customOptions, setCustomOptions] = useState({
    dallEVersion: 'Select',
    gptVersion: 'Select',
    customerSupport: 'Select',
    numCreAItions: null,
  });

  const { token, _id, name, email, subscription } =
    useSelector((state) => state.user) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    setStripePromise(loadStripe(`${import.meta.env.VITE_STRIPE_PUB_KEY_LIVE}`));
  }, []);

  const upgradeMembership = (amount, plan) => {
    setAmount(amount);
    setPlanType(plan);
    setShowUpgradeModal(false);
    setShowStripeModal(true);
  };

  const cancelPopup = () => {
    setShowCancelSubscriptionModal(true);
  };

  const cancelSubscription = async () => {
    setIsCancelling(true);
    await cancelStripeSubscription(token, _id, subscriptionId)
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
          },
        });
        setShowCancelSubscriptionModal(false);
        toast.error('Your subscription has now been cancelled.');
      })
      .catch((err) => console.error(err))
      .finally(() => setIsCancelling(false));
  };

  const calculateCustomAmount = async (e) => {
    e.preventDefault();
    if (!customOptions.numCreAItions) {
      toast.error(
        'Please enter the number of CreAItions you want to receive per month'
      );
      return;
    }

    let fee = 0;

    if (customOptions.dallEVersion === 'Dall-E-2') {
      fee += customOptions.numCreAItions * 5;
    } else if (customOptions.dallEVersion === 'Dall-E-3') {
      fee += customOptions.numCreAItions * 15;
    }
    if (customOptions.gptVersion === 'GPT-4 Turbo') {
      fee += 500;
    }
    if (customOptions.customerSupport === 'Priority') {
      fee += 499;
    }
    setShowPersonalizeModal(false);
    upgradeMembership(fee, 'custom');
  };

  const {
    plan,
    cost,
    imagesRemaining,
    expiry,
    subscriptionId,
    cancelled,
    dalleVersion,
    gptVersion,
    customerSupport,
  } = subscription || {};

  if (!_id) {
    return <PageLoader />;
  }

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto p-4">
        <h1 className="font-extrabold text-[32px]">My Subscription</h1>
        <p className="mt-2 text-[#666e75] text-[16px]">
          You are currently subscribed on a{' '}
          <span className="font-bold text-main text-[24px] mx-1">
            {plan.toUpperCase()}
          </span>{' '}
          plan.
        </p>
        <p className="mt-2 text-[#666e75] text-[16px]">
          You are permitted to generate{' '}
          <span className="font-bold text-main text-[24px] mx-1">
            {imagesRemaining}
          </span>{' '}
          more {imagesRemaining === 1 ? 'image ' : 'images '}
          {plan === 'free' ? 'until you upgrade' : 'this month'}.
        </p>
        {plan !== 'free' && (
          <p className="mt-2 text-[#666e75] text-[16px]">
            Your current subscription is{' '}
            {cancelled ? 'coming to an end' : 'set to renew'} on{' '}
            <span className="font-bold text-main text-[24px] mx-1">
              {moment(expiry).format('ddd, MMMM Do YYYY')}.
            </span>
          </p>
        )}
        <div className="mt-12">
          {subscription && plan === 'free' && (
            <FreeCard
              text="Upgrade"
              imagesNum={
                imagesRemaining === 1
                  ? `${imagesRemaining} image generation`
                  : `${imagesRemaining} image generations`
              }
              action={() => setShowUpgradeModal(true)}
            />
          )}
          {subscription && plan === 'deluxe' && (
            <DeluxeCard
              text="Manage"
              imagesNum={
                imagesRemaining === 1
                  ? `${imagesRemaining} image generation`
                  : `${imagesRemaining} image generations`
              }
              emphasize={false}
              action={() => setShowUpgradeModal(true)}
              cancelled={cancelled}
              cancelPopup={cancelPopup}
              subscription={true}
            />
          )}
          {subscription && plan === 'premium' && (
            <PremiumCard
              text="Personalize"
              imagesNum={
                imagesRemaining === 1
                  ? `${imagesRemaining} image generation`
                  : `${imagesRemaining} image generations`
              }
              action={() => setShowPersonalizeModal(true)}
              cancelled={cancelled}
              cancelPopup={cancelPopup}
              subscription={true}
            />
          )}
          {subscription && plan === 'custom' && (
            <CustomCard
              text="Personalize"
              cost={cost}
              imagesNum={
                imagesRemaining === 1
                  ? `${imagesRemaining} image generation`
                  : `${imagesRemaining} image generations`
              }
              dalleVersion={dalleVersion}
              gptVersion={gptVersion}
              customerSupport={customerSupport}
              action={() => setShowPersonalizeModal(true)}
              cancelled={cancelled}
              cancelPopup={cancelPopup}
              subscription={true}
            />
          )}
        </div>
        <Modal
          isVisible={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
        >
          <div className="p-6 lg:px-8 text-left">
            {plan === 'free' && (
              <>
                <h1 className="font-extrabold text-[32px]">
                  Upgrade your subscription
                </h1>
                <p className="mt-2 text-[#666e75] text-[16px] flex items-center">
                  To upgrade your plan, please select one from the options
                  below.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <DeluxeCardMini
                    action={() => upgradeMembership(1999, 'deluxe')}
                  />
                  <PremiumCardMini
                    action={() => upgradeMembership(3999, 'premium')}
                  />
                </div>
                <p className=" text-[#666e75] text-[16px] flex items-center">
                  If you require a custom plan tailored to your needs, please
                  select your requirements from the options below.
                </p>
                <CustomOptions
                  calculateCustomAmount={calculateCustomAmount}
                  customOptions={customOptions}
                  setCustomOptions={setCustomOptions}
                />
              </>
            )}
            {plan === 'deluxe' && (
              <>
                <h1 className="font-extrabold text-[32px]">
                  Manage your subscription
                </h1>
                <p className="mt-2 text-[#666e75] text-[16px] flex items-center">
                  To upgrade your plan to a Premium subscription, please select
                  below.
                </p>

                <div className="mt-8">
                  <PremiumCardMini
                    action={() => upgradeMembership(3999, 'premium')}
                  />
                </div>

                <p className="pt-8 text-[#666e75] text-[16px] flex items-center">
                  If you require a custom plan tailored to your needs, please
                  select your requirements from the options below.
                </p>
                <CustomOptions
                  calculateCustomAmount={calculateCustomAmount}
                  customOptions={customOptions}
                  setCustomOptions={setCustomOptions}
                />
              </>
            )}
          </div>
        </Modal>
        <Modal
          isVisible={showPersonalizeModal}
          onClose={() => setShowPersonalizeModal(false)}
        >
          <div className="p-6 lg:px-8 text-left">
            <h1 className="font-extrabold text-[32px]">
              Let's tailor your plan
            </h1>
            <p className="mt-2 text-[#666e75] text-[16px] flex items-center">
              Please select from the options below to customize your plan.
            </p>
            <CustomOptions
              calculateCustomAmount={calculateCustomAmount}
              customOptions={customOptions}
              setCustomOptions={setCustomOptions}
            />
          </div>
        </Modal>
        <Modal
          isVisible={showStripeModal}
          onClose={() => setShowStripeModal(false)}
        >
          <div className="p-6 lg:px-8 text-left">
            <h1 className="font-extrabold text-[32px]">
              Enter Payment Details
            </h1>
            <p className="mt-2 text-[#666e75] text-[16px] flex items-center mb-4">
              You are about to make a recurring payment of{' '}
              <span className="font-bold text-main text-[24px] mx-1">
                ${(amount / 100).toFixed(2)} / month
              </span>{' '}
            </p>
            {stripePromise && (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={amount}
                  planType={planType}
                  customOptions={customOptions}
                  setCustomOptions={setCustomOptions}
                  setShowStripeModal={setShowStripeModal}
                  setShowPaymentCompletionModal={setShowPaymentCompletionModal}
                  setCard={setCard}
                />
              </Elements>
            )}
          </div>
        </Modal>
        <Modal
          isVisible={showPaymentCompletionModal}
          onClose={() => setShowPaymentCompletionModal(false)}
        >
          <div className="p-6 lg:px-8 text-left">
            <h1 className="font-extrabold text-[32px]">Payment successful!</h1>
            <p className="mt-2 text-[#666e75] text-[16px] flex items-center">
              Thank you for your purchase. Your subscription is now active, and
              this month's payment has been processed successfully.
            </p>
          </div>
          <div className="m-8">
            <CreditCard card={card} name={name} />
          </div>
          <p className="p-6 lg:px-8 mt-2 text-[#666e75] text-[16px] flex items-center">
            We've sent the full details of your subscription to your email
            address. If you have any questions or need further assistance, feel
            free to contact our support team. Thank you for choosing our
            service!
          </p>
        </Modal>
        <Modal
          isVisible={showCancelSubscriptionModal}
          onClose={() => setShowCancelSubscriptionModal(false)}
        >
          <div className="p-6 lg:px-8 text-left">
            <h1 className="font-extrabold text-[32px]">
              Are you sure you want to cancel your subscription?
            </h1>
            <p className="mt-2 text-[#666e75] text-[16px] flex items-center">
              You will continue to have access to {plan} features until{' '}
              {moment(expiry).format('ddd, MMMM Do YYYY')}. After that, your
              account will automatically revert to the free plan, and you will
              lose access to {plan} features.
            </p>
          </div>
          <div className="text-center mb-4">
            <button
              onClick={cancelSubscription}
              className="bg-red hover:bg-redDark w-[200px] rounded-md font-medium my-3 mx-auto py-3 text-black"
            >
              {isCancelling ? <LoaderBlack /> : 'Yes, cancel'}
            </button>
          </div>
        </Modal>
      </section>
    </>
  );
};

export default Subscription;
