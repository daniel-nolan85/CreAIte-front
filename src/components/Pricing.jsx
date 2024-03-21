import CustomCard from './CustomCard';
import DeluxeCard from './DeluxeCard';
import FreeCard from './FreeCard';
import PremiumCard from './PremiumCard';

const Pricing = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
        <FreeCard text='Get Started' imagesNum='5 image generations' />
        <DeluxeCard
          text='Get Started'
          imagesNum='100 image generations'
          emphasize={true}
        />
        <PremiumCard text='Get Started' imagesNum='200 image generations' />
        <CustomCard text='Contact Us' imagesNum='Custom image generation' />
      </div>
    </div>
  );
};

export default Pricing;
