import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import PageLoader from '../components/PageLoader';
import FormField from '../components/FormField';
import MessageField from '../components/MessageField';
import LoaderBlack from '../components/LoaderBlack';
import send from '../assets/send.svg';
import { checkRecaptcha, sendUserEmail } from '../requests/email';
import ReCaptchaV2 from 'react-google-recaptcha';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [token, setToken] = useState(null);
  const [human, setHuman] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email)) {
      toast.error('Please enter a valid email');
      return;
    } else if (!form.name) {
      toast.error('Please enter your name');
      return;
    } else if (!form.subject) {
      toast.error('Please enter a subject');
      return;
    } else if (!form.message) {
      toast.error('Please enter your message');
      return;
    } else if (!human) {
      toast.error('You must pass ReCaptcha verification to send a message.');
      return;
    }
    setIsLoading(true);

    try {
      await sendUserEmail(form).then(async (res) => {
        toast.success(
          'Your message has been successfully sent. Thank you for reaching out!'
        );
        setForm({ name: '', email: '', subject: '', message: '' });
      });
    } catch (err) {
      console.error('API request error: ', err);
      toast.error('Failed to send email. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRecaptcha = async (token) => {
    setToken(token);
    const secret = import.meta.env.VITE_RECAPTCHA_SECRET_KEY;

    await checkRecaptcha(token, secret)
      .then((res) => {
        setHuman(res.data.success);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleExpire = () => {
    setToken(null);
  };

  return (
    <>
      <Navbar />
      <section className='max-w-7xl mx-auto p-4'>
        <h1 className='font-extrabold text-[32px]'>Contact Us</h1>
        <p className='mt-2 text-[#666e75] text-[16px]'>
          Thank you for reaching out to us! Your feedback, questions, and
          queries are important to us. Please feel free to use the form below to
          get in touch with our team. Whether you have inquiries about our
          services, need assistance, or simply want to share your thoughts,
          we're here to help.
        </p>
        <form className='mt-8' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <FormField
              labelName='Name'
              type='text'
              name='name'
              placeholder='Please enter your name'
              value={form.name}
              handleChange={handleChange}
            />
            <FormField
              labelName='Email'
              type='email'
              name='email'
              placeholder='Please enter your email'
              value={form.email}
              handleChange={handleChange}
            />
            <FormField
              labelName='Subject'
              type='text'
              name='subject'
              placeholder='Please enter your subject'
              value={form.subject}
              handleChange={handleChange}
            />
            <MessageField
              labelName='Message'
              type='text'
              name='message'
              placeholder='Please enter your message'
              value={form.message}
              handleChange={handleChange}
            />
            <ReCaptchaV2
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleRecaptcha}
              onExpired={handleExpire}
            />
          </div>
          <button
            type='submit'
            className='w-40 mt-3 bg-main hover:bg-mainDark rounded-md px-5 py-2.5 flex justify-center items-center'
          >
            {isLoading ? (
              <LoaderBlack />
            ) : (
              <img src={send} height={25} width={25} />
            )}
          </button>
        </form>
      </section>
    </>
  );
};

export default Contact;
