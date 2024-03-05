import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import preview from '../assets/preview.png';
import { getRandomPrompt } from '../utils';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import { createImage, createCreation } from '../requests/creation';

const Create = () => {
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { token, name } = useSelector((state) => state.user);

  useEffect(() => {
    setForm({ ...form, name });
  }, [name]);

  const navigate = useNavigate();

  const generateImg = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        await createImage(token, form.prompt)
          .then((res) => {
            console.log('res => ', res.data);
            setForm({
              ...form,
              photo: `data:image/jpeg;base64,${res.data.photo}`,
            });
          })
          .catch((error) => {
            alert(error);
          });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setIsLoading(true);
      try {
        await createCreation(token, form)
          .then((res) => {
            console.log('res => ', res.data);
          })
          .catch((error) => {
            alert(error);
          });
        navigate('/dashboard');
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate an image');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <>
      <Navbar />
      <section className='max-w-7xl mx-auto p-4'>
        <div>
          <h1 className='font-extrabold text-[32px]'>Create</h1>
          <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
            Create imaginative and visually stunning images using AI and share
            them with the community
          </p>
        </div>
        <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <FormField
              labelName='Prompt'
              type='text'
              name='prompt'
              placeholder={getRandomPrompt()}
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mainDark-500 focus:border-mainDark-500 w-64 p-3 h-64 flex justify-center items-center'>
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className='w-full h-full object-contain'
                />
              ) : (
                <img
                  src={preview}
                  alt='preview'
                  className='w-9/12 h-9/12 object-contain opacity-40'
                />
              )}
              {generatingImg && (
                <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                  <Loader />
                </div>
              )}
            </div>
          </div>
          <div className='mt-5 flex gap-5'>
            <button
              type='button'
              onClick={generateImg}
              className=' text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              {generatingImg ? 'Generating...' : 'Generate'}
            </button>
          </div>
          <div className='mt-10'>
            <p className='mt-2 text-[#666e75] text-[14px]'>
              Once you have created the image you want, you can share it with
              others in the community
            </p>
            <button
              type='submit'
              className='mt-3 text-white bg-main font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              {isLoading ? 'Sharing...' : 'Share with the community'}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Create;
