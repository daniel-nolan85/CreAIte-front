import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { captureUserEmail } from '../requests/user';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const captureEmail = async () => {
    setIsLoading(false);
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      toast.error('Please enter a valid email');
      return;
    }

    await captureUserEmail(email)
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          toast.warning(
            'Thank you for your interest! You are already subscribed to receive our emails.'
          );
        } else {
          toast.success(
            'Thank you for subscribing! You will now receive our latest updates and news.'
          );
        }
        setEmail('');
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(setIsLoading(false));
  };

  return (
    <div id='newsletter' className='w-full py-16 bg-[#000300] text-white px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Stay in the loop with CreAIte
          </h1>
          <p>
            Enter your email to receive the latest news, updates, and exclusive
            offers straight to your inbox.
          </p>
        </div>
        <div className='my-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              type='email'
              placeholder='Enter email'
              className='p-3 flex w-full rounded-md text-black'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className='bg-main hover:bg-mainDark text-black w-[200px] rounded-md font-medium ml-4 my-6 px-6 py-3'
              onClick={captureEmail}
            >
              {isLoading ? <LoaderBlack /> : 'Notify Me'}
            </button>
          </div>
          <p>
            We care about the protection of your data. Read our{' '}
            <span className='text-main'>
              <Link to='/privacy'>Privacy Policy</Link>.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
