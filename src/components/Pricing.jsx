import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import CustomCard from './CustomCard';
import DeluxeCard from './DeluxeCard';
import FreeCard from './FreeCard';
import PremiumCard from './PremiumCard';
import Modal from './Modal';
import StaggeredDropdown from './StaggeredDropdown';
import FormField from './FormField';

const Pricing = () => {
  const [showPersonalizeModal, setShowPersonalizeModal] = useState(false);
  const [dallEVersion, setDallEVersion] = useState('Dall-E-2');
  const [gptVersion, setGptVersion] = useState('GPT-3.5');
  const [customerSupport, setCustomerSupport] = useState('Standard');
  const [numCreAItions, setNumCreAItions] = useState(null);
  const [quote, setQuote] = useState(null);

  const { token, _id } = useSelector((state) => state.user) || {};

  const navigate = useNavigate();

  useEffect(() => {
    if (!showPersonalizeModal) {
      setDallEVersion('Dall-E-2');
      setGptVersion('GPT-3.5');
      setCustomerSupport('Standard');
      setNumCreAItions(null);
      setQuote(null);
    }
  }, [showPersonalizeModal]);

  const calculateCustomAmount = async (e) => {
    e.preventDefault();
    if (!numCreAItions) {
      toast.error(
        'Please enter the number of CreAItions you want to receive per month'
      );
      return;
    }

    let fee = 0;

    if (dallEVersion === 'Dall-E-2') {
      fee += numCreAItions * 5;
    } else if (dallEVersion === 'Dall-E-3') {
      fee += numCreAItions * 15;
    }
    if (gptVersion === 'GPT-4 Turbo') {
      fee += 500;
    }
    if (customerSupport === 'Priority') {
      fee += 499;
    }
    setQuote(fee);
  };

  const navigateToCreAIte = () => {
    if (token) {
      navigate('/creaite');
    } else {
      navigate('/login', { state: { to: '/creaite' } });
    }
  };

  const navigateToSubscription = () => {
    if (token) {
      navigate(`/subscription/${_id}`);
    } else {
      navigate('/login', { state: { to: `/subscription/${_id}` } });
    }
  };

  return (
    <div id="pricing" className="w-full py-[10rem] px-4 bg-white">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FreeCard
          text="Get Started"
          imagesNum="5 image generations"
          action={navigateToCreAIte}
        />
        <DeluxeCard
          text="Get Started"
          imagesNum="100 image generations"
          emphasize={true}
          action={navigateToSubscription}
        />
        <PremiumCard
          text="Get Started"
          imagesNum="200 image generations"
          action={navigateToSubscription}
        />
        <CustomCard
          text="Get a Quote"
          imagesNum="Custom image generation"
          action={() => setShowPersonalizeModal(true)}
        />
      </div>
      <Modal
        isVisible={showPersonalizeModal}
        onClose={() => setShowPersonalizeModal(false)}
      >
        <div className="p-6 lg:px-8 text-left">
          <h1 className="font-extrabold text-[32px]">Let's tailor your plan</h1>
          <p className="mt-2 text-[#666e75] text-[16px] flex items-center">
            Please select from the options below to customize your plan. Once
            you've made your selections, we'll provide you with a quote on how
            much your plan will cost.
          </p>
          <form className="mt-8" onSubmit={calculateCustomAmount}>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
              <StaggeredDropdown
                header="Choose Dall-E version"
                option={dallEVersion}
                setOption={setDallEVersion}
                options="dalle"
              />
              <StaggeredDropdown
                header="Choose GPT version"
                option={gptVersion}
                setOption={setGptVersion}
                options="gpt"
              />
              <StaggeredDropdown
                header="Choose customer support level"
                option={customerSupport}
                setOption={setCustomerSupport}
                options="support"
              />
            </div>
            <FormField
              labelName="Number of CreAItions"
              type="number"
              placeholder="Enter the number of CreAItions needed per month"
              value={numCreAItions}
              handleChange={(e) => setNumCreAItions(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="w-40 mt-4 text-black bg-main hover:bg-mainDark font-medium rounded-md text-sm px-5 py-2.5 text-center"
              >
                Get a Quote
              </button>
              {quote && (
                <p className=" font-bold text-2xl mt-3 flex items-center">
                  Monthly cost:{' '}
                  <span className="text-main text-4xl ml-3">
                    ${(quote / 100).toFixed(2)}
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Pricing;
