import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import preview from '../assets/preview.png';
import { getRandomPrompt } from '../utils';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import {
  createImage,
  createCaption,
  createKeywords,
  saveCreation,
} from '../requests/creation';

const Create = () => {
  const [form, setForm] = useState({
    createdBy: '',
    prompt: '',
    photo: '',
    caption: '',
    keywords: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captionRequired, setCaptionRequired] = useState(false);
  const [keywordsRequired, setKeywordsRequired] = useState(false);
  const [shareCreation, setShareCreation] = useState(true);

  const { token, _id } = useSelector((state) => state.user) || {};

  useEffect(() => {
    setForm({ ...form, createdBy: _id });
  }, [_id]);

  const navigate = useNavigate();

  const generateImg = async () => {
    if (!form.prompt) {
      toast.error('Please enter a prompt');
      return;
    }

    try {
      setGeneratingImg(true);
      const res = await createImage(token, form.prompt);
      setForm((prevForm) => ({
        ...prevForm,
        photo: `data:image/jpeg;base64,${res.data.photo}`,
      }));

      if (captionRequired) {
        const captionRes = await createCaption(token, form.prompt);
        setForm((prevForm) => ({
          ...prevForm,
          caption: captionRes.data.caption,
        }));
      }

      if (keywordsRequired) {
        const keywordsRes = await createKeywords(token, form.prompt);
        setForm((prevForm) => ({
          ...prevForm,
          keywords: keywordsRes.data.keywords,
        }));
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setGeneratingImg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setIsLoading(true);
      try {
        await saveCreation(token, form, shareCreation)
          .then((res) => {
            console.log('res => ', res.data);
          })
          .catch((error) => {
            toast.error(error);
          });
        navigate('/showcase');
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Please enter a prompt and generate an image');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const KeywordsComponent = ({ keywords }) => {
    const keywordsArray = keywords
      .split(',')
      .filter((keyword) => keyword.trim() !== '');

    return (
      <div>
        {keywordsArray.map((keyword, index) => (
          <span
            key={index}
            className='inline-block mb-2 mr-2 text-black bg-main font-medium rounded-full text-sm px-5 py-2.5 text-center mx-2'
          >
            {keyword}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <section className='max-w-7xl mx-auto p-4'>
        <div>
          <h1 className='font-extrabold text-[32px]'>Create</h1>
          <p className='mt-2 text-[#666e75] text-[16px]'>
            Unleash your imagination and generate stunning visuals with our
            AI-powered image creation tool, turning your ideas into reality at
            the click of a button. Don't forget to share your masterpieces with
            the community and inspire others with your creativity!
          </p>
        </div>

        <form className='mt-16' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <FormField
              labelName='Prompt'
              type='text'
              name='prompt'
              placeholder='Describe what you want to see...'
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div className='flex items-center'>
              <p className='w-40 block h-7 text-sm font-medium text-gray-900'>
                Create a caption
              </p>
              <label htmlFor='toggleCaption'>
                <input
                  type='checkbox'
                  id='toggleCaption'
                  className='cursor-pointer h-8 w-16 rounded-full appearance-none bg-red bg-opacity-20 border-mainDark checked:bg-main checked:bg-opacity-20 transition duration-200 relative'
                  checked={captionRequired}
                  onChange={() => setCaptionRequired(!captionRequired)}
                />
                <span></span>
              </label>
            </div>
            <div className='flex items-center'>
              <p className='w-40 block h-7  text-sm font-medium text-gray-900'>
                Create keywords
              </p>
              <label htmlFor='toggleKeywords'>
                <input
                  type='checkbox'
                  id='toggleKeywords'
                  className='cursor-pointer h-8 w-16 rounded-full appearance-none bg-red bg-opacity-20 border-mainDark checked:bg-main checked:bg-opacity-20 transition duration-200 relative'
                  checked={keywordsRequired}
                  onChange={() => setKeywordsRequired(!keywordsRequired)}
                />
                <span></span>
              </label>
            </div>
            <div className='flex'>
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
              <div className='flex-1 ml-4'>
                {form.caption && (
                  <div>
                    <h2 className='font-extrabold text-[24px] text-black mb-2'>
                      AI generated caption
                    </h2>
                    <p>{form.caption.slice(1, -1)}</p>
                  </div>
                )}
                {form.keywords && (
                  <div>
                    <h2 className='font-extrabold text-[24px] text-black my-2'>
                      AI generated keywords
                    </h2>
                    <KeywordsComponent keywords={form.keywords} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='my-5 flex gap-5'>
            <button
              type='button'
              onClick={generateImg}
              className='text-black bg-main font-medium rounded-md text-sm w-64 px-5 py-2.5 text-center'
            >
              {generatingImg ? 'Generating...' : 'Generate'}
            </button>
          </div>
          <div className='mt-10 flex items-center'>
            <p className='w-40 block h-7 text-sm font-medium text-gray-900'>
              Share with community
            </p>
            <label htmlFor='toggleShare'>
              <input
                type='checkbox'
                id='toggleShare'
                className='cursor-pointer h-8 w-16 rounded-full appearance-none bg-red bg-opacity-20 border-mainDark checked:bg-main checked:bg-opacity-20 transition duration-200 relative'
                checked={shareCreation}
                onChange={() => setShareCreation(!shareCreation)}
              />
              <span></span>
            </label>
          </div>
          <p className='mt-2 text-[#666e75] text-[14px]'>
            By choosing to share your CreAItions with the community, you're
            opening them up for others to see and download. Your CreAItions will
            be showcased to help inspire other members.
          </p>
          <div className='mt-10'>
            <button
              type='submit'
              className={`mt-3 text-black font-medium rounded-md text-sm w-64 px-5 py-2.5 text-center ${
                !form.photo ? 'bg-gray-300 cursor-not-allowed' : 'bg-main'
              }`}
              disabled={!form.photo}
            >
              {isLoading ? 'Saving...' : 'Save this CreAItion'}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Create;
