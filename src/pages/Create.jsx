import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaExpand } from 'react-icons/fa';
import { FaRegImage } from 'react-icons/fa6';
import { BsCardImage, BsFileImage } from 'react-icons/bs';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
import LoaderBlack from '../components/LoaderBlack';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import Keywords from '../components/Keywords';
import StaggeredDropdown from '../components/StaggeredDropdown';
import {
  createPrompt,
  createImage,
  createCaption,
  createKeywords,
  saveCreation,
} from '../requests/creation';
import { acknowledgeCreAItionInstructions } from '../requests/user';
import FacebookUploader from '../components/FacebookUploader';

const Create = () => {
  const [form, setForm] = useState({
    createdBy: '',
    prompt: '',
    photos: [],
    caption: '',
    keywords: '',
  });
  const [generatingPrompt, setGeneratingPrompt] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captionRequired, setCaptionRequired] = useState(false);
  const [keywordsRequired, setKeywordsRequired] = useState(false);
  const [imageSize, setImageSize] = useState('');
  const [imageQuantity, setImageQuantity] = useState(1);
  const [shareCreation, setShareCreation] = useState(true);
  useState(false);
  const [showUpgradePlanModal, setShowUpgradePlanModal] = useState(false);
  const [showCreAItionInstructionsModal, setShowCreAItionInstructionsModal] =
    useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [saved, setSaved] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [understood, setUnderstood] = useState(false);

  const { token, _id, subscription, showCreAitionInstructions } =
    useSelector((state) => state.user) || {};
  const { imagesRemaining, dalleVersion, gptVersion, plan } =
    subscription || {};
  const dispatch = useDispatch();

  useEffect(() => {
    setForm({ ...form, createdBy: _id });
    if (dalleVersion === 'Dall-E-2') setImageSize('256x256');
    else setImageSize('1024x1024');
  }, [_id]);

  const navigate = useNavigate();

  const resetForm = () => {
    setForm({
      createdBy: _id,
      prompt: '',
      photos: [],
      caption: '',
      keywords: '',
    });
    setCaptionRequired(false);
    setKeywordsRequired(false);
    setShareCreation(true);
    setSaved(false);
    setImageQuantity(1);
    if (dalleVersion === 'Dall-E-2') setImageSize('256x256');
    else setImageSize('1024x1024');
  };

  const generateImg = async () => {
    if (!form.prompt) {
      toast.error('Please enter a prompt');
      return;
    }
    if (imageQuantity > imagesRemaining) {
      setShowUpgradePlanModal(true);
      return;
    }
    try {
      setForm({
        ...form,
        photos: [],
        caption: '',
        keywords: '',
      });
      setSaved(false);
      setGeneratingImg(true);
      const res = await createImage(
        token,
        _id,
        form.prompt,
        imageSize,
        imageQuantity,
        dalleVersion
      );
      if (res.data.photos && res.data.photos.length > 0) {
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            token,
            _id: res.data.user._id,
            role: res.data.role,
            email: res.data.user.email,
            name: res.data.user.name,
            bio: res.data.user.bio,
            profileImage: res.data.user.profileImage,
            coverImage: res.data.user.coverImage,
            subscription: res.data.user.subscription,
            likes: res.data.likes,
            downloads: res.data.downloads,
            newMessages: res.data.newMessages,
            monthlyAllocation: res.data.monthlyAllocation,
            showCreAitionInstructions: res.data.showCreAitionInstructions,
          },
        });
        const photoData = res.data.photos.map(
          (photo) => `data:image/jpeg;base64,${photo}`
        );
        setForm((prevForm) => ({
          ...prevForm,
          photos: photoData,
        }));
        if (showCreAitionInstructions) {
          setShowCreAItionInstructionsModal(true);
        }
      }

      if (captionRequired) {
        const captionRes = await createCaption(token, form.prompt, gptVersion);
        setForm((prevForm) => ({
          ...prevForm,
          caption: captionRes.data.caption,
        }));
      }

      if (keywordsRequired) {
        const keywordsRes = await createKeywords(
          token,
          form.prompt,
          gptVersion
        );
        setForm((prevForm) => ({
          ...prevForm,
          keywords: keywordsRes.data.keywords,
        }));
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred while generating images.');
      }
    } finally {
      setGeneratingImg(false);
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const toggleSelect = (index) => {
    setSelectedImages((prevSelectedImages) => {
      const isSelected = prevSelectedImages.includes(index);
      if (!isSelected) {
        return [...prevSelectedImages, index];
      } else {
        return prevSelectedImages.filter((idx) => idx !== index);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && selectedImages.length > 0) {
      setIsLoading(true);
      try {
        const selectedPhotos = form.photos.filter((photo, index) =>
          selectedImages.includes(index)
        );
        await saveCreation(
          token,
          { ...form, photos: selectedPhotos },
          shareCreation,
          imageSize,
          dalleVersion
        )
          .then((res) => {
            toast.success('Your creation has been saved successfully!');
            setSaved(true);
          })
          .catch((error) => {
            toast.error(error);
          });
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error('Please select at least one image to save');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = async () => {
    setGeneratingPrompt(true);
    const promptRes = await createPrompt(token, gptVersion);
    setForm((prevForm) => ({
      ...prevForm,
      prompt: promptRes.data.prompt,
    }));
    setGeneratingPrompt(false);
  };

  const handleUnderstood = async () => {
    setShowCreAItionInstructionsModal(false);

    if (understood) {
      try {
        await acknowledgeCreAItionInstructions(token, _id);
      } catch (err) {
        console.error('Error acknowledging instructions:', err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto p-4">
        <div>
          <h1 className="font-extrabold text-[32px]">CreAIte</h1>
          <p className="mt-2 text-[#666e75] text-[16px]">
            Unleash your imagination and generate stunning visuals with our
            AI-powered image creation tool, turning your ideas into reality at
            the click of a button. Don't forget to share your masterpieces with
            the community and inspire others with your creativity!
          </p>
          <p className="mt-2 text-[#666e75] text-[16px]">
            You are permitted to generate{' '}
            <span className="font-bold text-main text-[24px] mx-1">
              {imagesRemaining}
            </span>{' '}
            more {imagesRemaining === 1 ? 'image ' : 'images '}
            {plan === 'free' ? 'until you upgrade' : 'this month'}.
          </p>
        </div>
        <form className="mt-16" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="Describe what you want to see..."
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
              generatingPrompt={generatingPrompt}
            />
            <div className="flex justify-between flex-col md:flex-row py-8">
              <div className="flex items-center mb-6 md:mb-0">
                <p className="w-40 block h-7 text-sm font-medium text-gray-900">
                  Create a caption
                </p>
                <label htmlFor="toggleCaption">
                  <input
                    type="checkbox"
                    id="toggleCaption"
                    className="cursor-pointer h-8 w-16 rounded-full appearance-none bg-red bg-opacity-20 border-mainDark checked:bg-main checked:bg-opacity-20 transition duration-200 relative"
                    checked={captionRequired}
                    onChange={() => setCaptionRequired(!captionRequired)}
                  />
                  <span></span>
                </label>
              </div>
              <div className="flex items-center mb-6 md:mb-0">
                <p className="w-40 block h-7 text-sm font-medium text-gray-900">
                  Create keywords
                </p>
                <label htmlFor="toggleKeywords">
                  <input
                    type="checkbox"
                    id="toggleKeywords"
                    className="cursor-pointer h-8 w-16 rounded-full appearance-none bg-red bg-opacity-20 border-mainDark checked:bg-main checked:bg-opacity-20 transition duration-200 relative"
                    checked={keywordsRequired}
                    onChange={() => setKeywordsRequired(!keywordsRequired)}
                  />
                  <span></span>
                </label>
              </div>
              <div className="flex items-center w-[150px]">
                <StaggeredDropdown
                  header="Select image size"
                  option={imageSize}
                  setOption={setImageSize}
                  dalleVersion={dalleVersion}
                />
              </div>
              <div className="flex items-center w-[150px]">
                <StaggeredDropdown
                  header="Select image quantity"
                  option={imageQuantity}
                  setOption={setImageQuantity}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              {form.photos && form.photos.length > 0 ? (
                form.photos.map((photo, index) => (
                  <div
                    key={index}
                    className={`relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mainDark-500 focus:border-mainDark-500 w-64 p-3 h-64 flex justify-center items-center mr-4 mb-4 ${
                      selectedImages.includes(index)
                        ? 'border-main border-4'
                        : ''
                    }`}
                  >
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className={`w-full h-full object-contain cursor-pointer ${
                        expandedIndex === index
                          ? 'absolute top-0 left-0 z-10 object-cover'
                          : ''
                      }`}
                      onClick={() => toggleSelect(index)}
                    />
                    <FaExpand
                      className="absolute top-2 right-2 m-2 cursor-pointer text-main"
                      style={{ fontSize: '50px' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(index);
                      }}
                    />
                    {expandedIndex === index && (
                      <div
                        className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
                        onClick={() => toggleExpand(null)}
                      >
                        <img
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className={
                            imageSize === '1024x1792'
                              ? 'h-[90%] w-auto'
                              : 'w-[90%] sm:w-[75%]'
                          }
                        />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mainDark-500 focus:border-mainDark-500 w-64 p-3 h-64 flex justify-center items-center mr-4 mb-4">
                  {imageSize === '1792x1024' ? (
                    <BsCardImage className="w-40 h-40 opacity-40" />
                  ) : imageSize === '1024x1792' ? (
                    <BsFileImage className="w-40 h-40 opacity-40" />
                  ) : (
                    <FaRegImage className="w-40 h-40 opacity-40" />
                  )}
                  {generatingImg && (
                    <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                      <Loader />
                    </div>
                  )}
                </div>
              )}

              <div className="flex-1 ml-0 lg:ml-4">
                {form.caption && (
                  <div>
                    <h2 className="font-extrabold text-[24px] text-black mb-2">
                      AI generated caption
                    </h2>
                    <p>{form.caption.slice(1, -1)}</p>
                  </div>
                )}
                {form.keywords && (
                  <div>
                    <h2 className="font-extrabold text-[24px] text-black my-2">
                      AI generated keywords
                    </h2>
                    <Keywords keywords={form.keywords} />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="my-5 flex gap-5">
            <button
              type="button"
              onClick={generateImg}
              className="text-black bg-main hover:bg-mainDark font-medium rounded-md text-sm w-64 px-5 py-2.5 text-center"
            >
              {generatingImg ? 'Generating...' : 'Generate CreAItion'}
            </button>
          </div>
          <div className="my-5 flex gap-5">
            <button
              type="button"
              onClick={resetForm}
              className="text-black bg-red hover:bg-redDark font-medium rounded-md text-sm w-64 px-5 py-2.5 text-center"
            >
              Reset
            </button>
          </div>
          <div className="mt-10 flex items-center">
            <p className="w-40 block h-7 text-sm font-medium text-gray-900">
              Share with community
            </p>
            <label htmlFor="toggleShare">
              <input
                type="checkbox"
                id="toggleShare"
                className="cursor-pointer h-8 w-16 rounded-full appearance-none bg-red bg-opacity-20 border-mainDark checked:bg-main checked:bg-opacity-20 transition duration-200 relative"
                checked={shareCreation}
                onChange={() => setShareCreation(!shareCreation)}
              />
              <span></span>
            </label>
          </div>
          <p className="mt-2 text-[#666e75] text-[14px]">
            By choosing to share your CreAItions with the community, you're
            opening them up for others to see and download. Your CreAItions will
            be showcased to help inspire other members.
          </p>

          {/* <FacebookUploader /> */}

          <div className="mt-10">
            <button
              type="submit"
              className={`mt-3 text-black font-medium rounded-md text-sm w-64 px-5 py-2.5 text-center ${
                !form.photos.length || saved
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-main hover:bg-mainDark'
              }`}
              disabled={!form.photos.length || saved}
            >
              {isLoading ? <LoaderBlack /> : 'Save this CreAItion'}
            </button>
          </div>
        </form>
        <Modal
          isVisible={showUpgradePlanModal}
          onClose={() => setShowUpgradePlanModal(false)}
        >
          <div className="p-6 lg:px-8 text-left">
            <h1 className="font-extrabold text-[32px]">Oops!</h1>
            <p className="mt-2 text-[#666e75] text-[16px] flex items-center">
              {imagesRemaining === 0
                ? "Looks like you've run out of image generations on your current plan. Upgrade your plan to create more stunning CreAItions!"
                : `Looks like you're only permitted to generate ${imagesRemaining} more ${
                    imagesRemaining === 1 ? 'CreAItion' : 'CreAItions'
                  } on your current plan. Upgrade or amend your selections to create more stunning CreAItions!`}
            </p>
          </div>
          <div className="text-center mb-4">
            <button
              onClick={() => navigate(`/subscription/${_id}`)}
              className="bg-main hover:bg-mainDark w-[200px] rounded-md font-medium my-3 mx-auto py-3 text-black"
            >
              Upgrade now
            </button>
          </div>
        </Modal>
        <Modal
          isVisible={showCreAItionInstructionsModal}
          onClose={() => setShowCreAItionInstructionsModal(false)}
        >
          <div className="p-6 lg:px-8 text-left">
            <h1 className="font-extrabold text-[32px]">
              Congratulations on generating your CreAItion! 🎉
            </h1>
            <p className="mt-2 text-[#666e75] text-[16px] flex items-center">
              To select the image(s) you wish to save, simply click anywhere on
              the image. You can also click the enlarge icon in the top right
              corner to get a closer look at the image. Select the image(s)
              you're happy with, then click "Save this CreAItion" below. Happy
              CreAIting!
            </p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2 ml-8"
                checked={understood}
                onChange={() => setUnderstood(!understood)}
              />
              <p className="text-sm text-black">Don't show me this again</p>
            </label>
          </div>
          <div className="text-center mb-4">
            <button
              onClick={handleUnderstood}
              className="bg-main hover:bg-mainDark w-[200px] rounded-md font-medium my-3 mx-auto py-3 text-black"
            >
              I understand
            </button>
          </div>
        </Modal>
      </section>
    </>
  );
};

export default Create;
