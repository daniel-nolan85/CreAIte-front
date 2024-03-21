import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
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

const Subscription = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [showPaymentCompletionModal, setShowPaymentCompletionModal] =
    useState(false);
  const [amount, setAmount] = useState();
  const [stripePromise, setStripePromise] = useState(null);
  const [card, setCard] = useState({});

  useEffect(() => {
    setStripePromise(loadStripe(`${import.meta.env.VITE_STRIPE_PUB_KEY}`));
  }, []);

  const { token, _id, name, email, subscription } =
    useSelector((state) => state.user) || {};

  const upgradeMembership = (amount) => {
    setAmount(amount);
    setShowUpgradeModal(false);
    setShowStripeModal(true);
  };

  const { plan, imagesRemaining, expiry } = subscription;

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
            Your current subscription is set to renew on{' '}
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
              action={() => setShowContactModal(true)}
            />
          )}
          {subscription && plan === 'custom' && (
            <CustomCard
              text='Contact Us'
              imagesNum={
                imagesRemaining === 1
                  ? `${imagesRemaining} image generation`
                  : `${imagesRemaining} image generations`
              }
              action={() => setShowContactModal(true)}
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
                  action={() => upgradeMembership(1499)}
                />
                <PremiumCard
                  text='Select'
                  imagesNum='200 image generations'
                  action={() => upgradeMembership(3499)}
                />
              </div>
            )}
            {plan === 'deluxe' && (
              <div className='mt-8'>
                <PremiumCard
                  text='Select'
                  imagesNum='200 image generations'
                  action={() => upgradeMembership(3499)}
                />
              </div>
            )}
          </div>
        </Modal>
        <Modal
          isVisible={showContactModal}
          onClose={() => setShowContactModal(false)}
        >
          <div className='p-6 lg:px-8 text-left'>
            <h1 className='font-extrabold text-[32px]'>
              Let's tailor your plan
            </h1>
            <p className='mt-2 text-[#666e75] text-[16px] flex items-center'>
              Please complete the form below to provide details on your
              requirements. This will help us understand your needs better and
              tailor a plan that suits you best.
            </p>
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
              the payment has been processed successfully.
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
      </section>
    </>
  );
};

export default Subscription;
