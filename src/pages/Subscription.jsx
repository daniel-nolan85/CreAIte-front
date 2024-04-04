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
import StaggeredDropdown from '../components/StaggeredDropdown';
import FormField from '../components/FormField';
import { cancelStripeSubscription } from '../requests/stripe';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
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
    setStripePromise(loadStripe(`${import.meta.env.VITE_STRIPE_PUB_KEY}`));
  }, []);

  const upgradeMembership = (amount) => {
    setAmount(amount);
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
      fee += 1000;
    }
    if (customOptions.customerSupport === 'Priority') {
      fee += 499;
    }
    setShowPersonalizeModal(false);
    upgradeMembership(fee);
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
      <section className='max-w-7xl mx-auto p-4'>
        <h1 className='font-extrabold text-[32px]'>My Subscription</h1>
        <p className='mt-2 text-[#666e75] text-[16px] flex items-center'>
          You are currently subscribed on a{' '}
          <span className='font-bold text-main text-[24px] mx-1'>
            {plan.toUpperCase()}
          </span>{' '}
          plan.
        </p>
        <p className='mt-2 text-[#666e75] text-[16px] flex items-center'>
          You are permitted to generate{' '}
          <span className='font-bold text-main text-[24px] mx-1'>
            {imagesRemaining}
          </span>{' '}
          more {imagesRemaining === 1 ? 'image ' : 'images '}
          {plan === 'free' ? 'until you upgrade' : 'this month'}.
        </p>
        {plan !== 'free' && (
          <p className='mt-2 text-[#666e75] text-[16px] flex items-center'>
            Your current subscription is{' '}
            {cancelled ? 'coming to an end' : 'set to renew'} on{' '}
            <span className='font-bold text-main text-[24px] mx-1'>
              {moment(expiry).format('ddd, MMMM Do YYYY')}.
            </span>
          </p>
        )}
        <div className='mt-12'>
          {subscription && plan === 'free' && (
            <FreeCard
              text='Upgrade'
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
              text='Upgrade'
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
              text='Personalize'
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
              text='Personalize'
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
          <div className='p-6 lg:px-8 text-left'>
            <h1 className='font-extrabold text-[32px]'>
              Upgrade your subscription
            </h1>
            <p className='mt-2 text-[#666e75] text-[16px] flex items-center'>
              To upgrade your plan, please select one from the options below. If
              you require a custom plan tailored to your needs, feel free to
              contact us and we'll be happy to assist you further.
            </p>
            {plan === 'free' && (
              <div className='grid md:grid-cols-2 gap-8 mt-8'>
                <DeluxeCard
                  text='Select'
                  imagesNum='100 image generations'
                  emphasize={false}
                  action={() => upgradeMembership(1999)}
                />
                <PremiumCard
                  text='Select'
                  imagesNum='200 image generations'
                  action={() => upgradeMembership(4499)}
                />
              </div>
            )}
            {plan === 'deluxe' && (
              <div className='mt-8'>
                <PremiumCard
                  text='Select'
                  imagesNum='200 image generations'
                  action={() => upgradeMembership(4499)}
                />
              </div>
            )}
          </div>
        </Modal>
        <Modal
          isVisible={showPersonalizeModal}
          onClose={() => setShowPersonalizeModal(false)}
        >
          <div className='p-6 lg:px-8 text-left'>
            <h1 className='font-extrabold text-[32px]'>
              Let's tailor your plan
            </h1>
            <p className='mt-2 text-[#666e75] text-[16px] flex items-center'>
              Please select from the options below to customize your plan.
            </p>
            <form className='mt-8' onSubmit={calculateCustomAmount}>
              <div className='flex justify-between items-center mb-4'>
                <StaggeredDropdown
                  header='Choose Dall-E version'
                  option={customOptions.dallEVersion}
                  setOption={(value) =>
                    setCustomOptions((prevState) => ({
                      ...prevState,
                      dallEVersion: value,
                    }))
                  }
                  options='dalle'
                />
                <StaggeredDropdown
                  header='Choose GPT version'
                  option={customOptions.gptVersion}
                  setOption={(value) =>
                    setCustomOptions((prevState) => ({
                      ...prevState,
                      gptVersion: value,
                    }))
                  }
                  options='gpt'
                />
                <StaggeredDropdown
                  header='Choose customer support level'
                  option={customOptions.customerSupport}
                  setOption={(value) =>
                    setCustomOptions((prevState) => ({
                      ...prevState,
                      customerSupport: value,
                    }))
                  }
                  options='support'
                />
              </div>
              <FormField
                labelName='Number of CreAItions'
                type='number'
                name='numCreAItions'
                placeholder='Enter the number of CreAItions needed per month'
                value={customOptions.numCreAItions}
                handleChange={(e) => {
                  setCustomOptions({
                    ...customOptions,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <button
                type='submit'
                className='w-40 mt-4 text-black bg-main hover:bg-mainDark font-medium rounded-md text-sm px-5 py-2.5 text-center'
              >
                {isLoading ? <LoaderBlack /> : 'Submit'}
              </button>
            </form>
          </div>
        </Modal>
        <Modal
          isVisible={showStripeModal}
          onClose={() => setShowStripeModal(false)}
        >
          <div className='p-6 lg:px-8 text-left'>
            <h1 className='font-extrabold text-[32px]'>
              Enter Payment Details
            </h1>
            <p className='mt-2 text-[#666e75] text-[16px] flex items-center mb-4'>
              You are about to make a recurring payment of{' '}
              <span className='font-bold text-main text-[24px] mx-1'>
                ${(amount / 100).toFixed(2)} / month
              </span>{' '}
            </p>
            {stripePromise && (
              <Elements stripe={stripePromise}>
                <PaymentForm
                  amount={amount}
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
          <div className='p-6 lg:px-8 text-left'>
            <h1 className='font-extrabold text-[32px]'>Payment successful!</h1>
            <p className='mt-2 text-[#666e75] text-[16px] flex items-center'>
              Thank you for your purchase. Your subscription is now active, and
              this month's payment has been processed successfully.
            </p>
          </div>
          <div className='m-8'>
            <CreditCard card={card} name={name} />
          </div>
          <p className='p-6 lg:px-8 mt-2 text-[#666e75] text-[16px] flex items-center'>
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
          <div className='p-6 lg:px-8 text-left'>
            <h1 className='font-extrabold text-[32px]'>
              Are you sure you want to cancel your subscription?
            </h1>
            <p className='mt-2 text-[#666e75] text-[16px] flex items-center'>
              You will continue to have access to {plan} features until{' '}
              {moment(expiry).format('ddd, MMMM Do YYYY')}. After that, your
              account will automatically revert to the free plan, and you will
              lose access to {plan} features.
            </p>
          </div>
          <div className='text-center mb-4'>
            <button
              onClick={cancelSubscription}
              className='bg-red hover:bg-redDark w-[200px] rounded-md font-medium my-3 mx-auto py-3 text-black'
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
