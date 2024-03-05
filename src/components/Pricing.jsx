import { MdMoneyOff, MdDashboardCustomize } from 'react-icons/md';
import { IoIosPricetag, IoIosPricetags } from 'react-icons/io';

const Pricing = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <MdMoneyOff className='mx-auto mt-[-3rem] text-main' size={80} />
          <h2 className='text-3xl font-bold text-center pt-8'>Free</h2>
          <p className='text-gray-500 text-sm pt-2 pb-6 text-center'>
            Includes access to GPT-3.5 for text generation and basic image
            generation features.
          </p>
          <p className='text-center text-4xl font-bold'>
            $0{' '}
            <span className='text-gray-500 text-[18px] ml-[-5px] font-normal'>
              /mo
            </span>
          </p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-8 mt-8'>
              Unlimited text generations
            </p>
            <p className='py-2 border-b mx-8'>5 image generations</p>
            <p className='py-2 border-b mx-8'>Creation History</p>
            <p className='py-2 border-b mx-8'>Standard customer support</p>
          </div>
          <p className='py-6 text-center'>
            Suitable for users with moderate text and image generation needs.
          </p>
          <button className='bg-main w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
            Get Started
          </button>
        </div>
        <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 my-8 md:my-0 rounded-lg hover:scale-105 duration-300'>
          <IoIosPricetag className='mx-auto mt-[-3rem] text-main' size={80} />
          <h2 className='text-3xl font-bold text-center pt-8'>Deluxe</h2>
          <p className='text-gray-500 text-sm pt-2 pb-6 text-center'>
            Upgrades to GPT-4 for improved text quality and coherence.
          </p>
          <p className='text-center text-4xl font-bold'>
            $14.99{' '}
            <span className='text-gray-500 text-[18px] ml-[-5px] font-normal'>
              /mo
            </span>
          </p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-8 mt-8'>
              Unlimited text generations
            </p>
            <p className='py-2 border-b mx-8'>200 image generations</p>
            <p className='py-2 border-b mx-8'>Creation History</p>
            <p className='py-2 border-b mx-8'>Priority customer support</p>
          </div>
          <p className='py-6 text-center'>
            Designed for users with higher text and image quality requirements.
          </p>
          <button className='bg-black text-main w-[200px] rounded-md font-medium my-6 mx-auto py-3 '>
            Get Started
          </button>
        </div>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <IoIosPricetags className='mx-auto mt-[-3rem] text-main' size={80} />
          <h2 className='text-3xl font-bold text-center pt-8'>Premium</h2>
          <p className='text-gray-500 text-sm pt-2 pb-6 text-center'>
            Offers access to GPT-4 Turbo for cutting-edge text generation
            capabilities.
          </p>
          <p className='text-center text-4xl font-bold'>
            $34.99{' '}
            <span className='text-gray-500 text-[18px] ml-[-5px] font-normal'>
              /mo
            </span>
          </p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-8 mt-8'>
              Unlimited text generations
            </p>
            <p className='py-2 border-b mx-8'>Unlimited image generations</p>
            <p className='py-2 border-b mx-8'>Creation History</p>
            <p className='py-2 border-b mx-8'>Priority customer support</p>
          </div>
          <p className='py-6 text-center'>
            Designed for power users and professionals who require the
            best-in-class text and image generation.
          </p>
          <button className='bg-main w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
            Get Started
          </button>
        </div>
        <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
          <MdDashboardCustomize
            className='mx-auto mt-[-3rem] text-main'
            size={80}
          />

          <h2 className='text-3xl font-bold text-center pt-8'>Custom</h2>
          <p className='text-gray-500 text-sm pt-2 pb-6 text-center'>
            Offers flexibility to choose between different GPT levels and image
            generation options.
          </p>
          <p className='text-center text-4xl font-bold'>You Decide</p>
          <div className='text-center font-medium'>
            <p className='py-2 border-b mx-8 mt-8'>
              Unlimited text generations
            </p>
            <p className='py-2 border-b mx-8'>Custom image generation</p>
            <p className='py-2 border-b mx-8'>Creation History</p>
            <p className='py-2 border-b mx-8'>Priority customer support</p>
          </div>
          <p className='py-6 text-center'>
            Ideal for businesses or enterprises with unique requirements and
            larger-scale usage.
          </p>
          <button className='bg-main w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
