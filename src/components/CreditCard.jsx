import { Tilt } from 'react-tilt';
import american from '../assets/american.svg';
import dinersClub from '../assets/diners-club.svg';
import discover from '../assets/discover.svg';
import jcb from '../assets/jcb.svg';
import mastercard from '../assets/mastercard.svg';
import union from '../assets/union.svg';
import visa from '../assets/visa.svg';
import chip from '../assets/chip.svg';

const CreditCard = ({ card, name }) => {
  console.log({ card });
  const { last4, exp_month, exp_year, brand } = card;
  return (
    <div className='flex justify-center items-center'>
      <Tilt
        style={{ fontFamily: 'Share Tech Mono' }}
        className='w-[280px] h-[180px] sm:w-[425px] sm:h-[270px] bg-gradient-to-tr rounded-2xl flex content-center items-center justify-center from-main to-[#00b39f]'
      >
        <div className='w-full h-full'>
          <div className='relative w-full h-full'>
            <img
              src={
                brand === 'american_express'
                  ? american
                  : brand === 'diners_club'
                  ? dinersClub
                  : brand === 'discover'
                  ? discover
                  : brand === 'jcb'
                  ? jcb
                  : brand === 'mastercard'
                  ? mastercard
                  : brand === 'visa'
                  ? visa
                  : brand === 'union_pay' && union
              }
              alt='card brand logo'
              className='absolute h-[50px] w-[100px] sm:h-[100px] sm:w-[200px]'
            />
            <img
              src={chip}
              alt='credit card chip'
              className='absolute right-5 bottom-0 top-0 my-auto h-[20px] w-[40px] sm:h-[35px] sm:w-[70px]'
            />
            <div className='p-8 flex flex-col w-full h-full justify-end sm:gap-4'>
              <div className='sm:text-2xl text-sm'>XXXX XXXX XXXX {last4}</div>
              <div className='flex justify-between'>
                <p className='sm:text-lg text-xs uppercase'>{name}</p>
                <p className='sm:text-lg text-xs uppercase'>
                  {exp_month}/{exp_year}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default CreditCard;
