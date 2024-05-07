import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import preview from '../assets/preview.png';
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
import FacebookUploader from '../components/FacebookUploader';

const Create = () => {
  const [form, setForm] = useState({
    createdBy: '',
    prompt: '',
    photo: '',
    caption: '',
    keywords: '',
  });
  const [generatingPrompt, setGeneratingPrompt] = useState(false);
  const [generatingImg, setGeneratingImg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [captionRequired, setCaptionRequired] = useState(false);
  const [keywordsRequired, setKeywordsRequired] = useState(false);
  const [regenImageRequired, setRegenImageRequired] = useState(false);
  const [regenCaptionRequired, setRegenCaptionRequired] = useState(false);
  const [regenKeywordsRequired, setRegenKeywordsRequired] = useState(false);
  const [imageSize, setImageSize] = useState('');
  const [shareCreation, setShareCreation] = useState(true);
  const [showRegenerateImageModal, setShowRegenerateImageModal] =
    useState(false);
  const [showUpgradePlanModal, setShowUpgradePlanModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);

  const { token, _id, subscription } = useSelector((state) => state.user) || {};
  const { imagesRemaining, dalleVersion, gptVersion } = subscription || {};
  const dispatch = useDispatch();

  useEffect(() => {
    setForm({ ...form, createdBy: _id });
    if (dalleVersion === 'Dall-E-2') setImageSize('256x256');
    else setImageSize('1024x1024');
  }, [_id]);

  const navigate = useNavigate();

  const resetForm = () => {
    setForm({
      createdBy: '',
      prompt: '',
      photo: '',
      caption: '',
      keywords: '',
    });
    setCaptionRequired(false);
    setKeywordsRequired(false);
    setShareCreation(true);
    setSaved(false);
    if (dalleVersion === 'Dall-E-2') setImageSize('256x256');
    else setImageSize('1024x1024');
  };

  const generateImg = async () => {
    if (!form.prompt) {
      toast.error('Please enter a prompt');
      return;
    }

    try {
      setGeneratingImg(true);
      const res = await createImage(
        token,
        _id,
        form.prompt,
        imageSize,
        dalleVersion,
        imagesRemaining
      );
      if (res.data.photo) {
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
          },
        });
        setForm((prevForm) => ({
          ...prevForm,
          photo: `data:image/jpeg;base64,${res.data.photo}`,
        }));
      } else {
        setShowUpgradePlanModal(true);
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
      toast.error(error);
    } finally {
      setGeneratingImg(false);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const regenerate = () => {
    setShowRegenerateImageModal(true);
  };

  const regenerateImg = async () => {
    setShowRegenerateImageModal(false);
    try {
      setGeneratingImg(true);

      if (regenImageRequired) {
        const res = await createImage(
          token,
          _id,
          form.prompt,
          imageSize,
          dalleVersion,
          imagesRemaining
        );
        if (res.data.photo) {
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
            },
          });
          setForm((prevForm) => ({
            ...prevForm,
            photo: `data:image/jpeg;base64,${res.data.photo}`,
          }));
        } else {
          setShowUpgradePlanModal(true);
        }
      }

      if (regenCaptionRequired) {
        const captionRes = await createCaption(token, form.prompt, gptVersion);
        setForm((prevForm) => ({
          ...prevForm,
          caption: captionRes.data.caption,
        }));
      }

      if (regenKeywordsRequired) {
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
        await saveCreation(token, form, shareCreation, imageSize, dalleVersion)
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
      toast.error('Please enter a prompt and generate an image');
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
              <div className="flex items-center">
                <StaggeredDropdown
                  header="Select image size"
                  option={imageSize}
                  setOption={setImageSize}
                  dalleVersion={dalleVersion}
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row">
              <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-mainDark-500 focus:border-mainDark-500 w-64 p-3 h-64 flex justify-center items-center">
                {form.photo ? (
                  <>
                    <img
                      src={form.photo}
                      alt={form.prompt}
                      className={`w-full h-full object-contain cursor-pointer ${
                        expanded
                          ? 'absolute top-0 left-0 z-10 w-full h-full object-cover'
                          : ''
                      }`}
                      onClick={toggleExpand}
                    />
                    {expanded && (
                      <div
                        className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
                        onClick={toggleExpand}
                      >
                        <img
                          src={form.photo}
                          alt={form.prompt}
                          className="max-w-full max-h-full"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-9/12 h-9/12 object-contain opacity-40"
                  />
                )}
                {generatingImg && (
                  <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                    <Loader />
                  </div>
                )}
              </div>
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
              onClick={
                !form.photo && !form.caption && !form.keywords
                  ? generateImg
                  : regenerate
              }
              className="text-black bg-main hover:bg-mainDark font-medium rounded-md text-sm w-64 px-5 py-2.5 text-center"
            >
              {generatingImg
                ? 'Generating...'
                : !form.photo && !form.caption && !form.keywords
                ? 'Generate CreAItion'
                : 'Regenerate'}
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
                !form.photo || saved
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-main hover:bg-mainDark'
              }`}
              disabled={!form.photo || saved}
            >
              {isLoading ? <LoaderBlack /> : 'Save this CreAItion'}
            </button>
          </div>
        </form>
        <Modal
          isVisible={showRegenerateImageModal}
          onClose={() => setShowRegenerateImageModal(false)}
        >
          <div className="p-6 flex">
            <div className="w-1/2 flex">
              <p className="w-40 block h-7 text-sm font-medium text-gray-900">
                Regenerate image
              </p>
              <label htmlFor="toggleRegenImage">
                <input
                  type="checkbox"
                  id="toggleRegenImage"
                  className="cursor-pointer h-8 w-16 rounded-full appearance-none bg-red bg-opacity-20 border-mainDark checked:bg-main checked:bg-opacity-20 transition duration-200 relative"
                  checked={regenImageRequired}
                  onChange={() => setRegenImageRequired(!regenImageRequired)}
                />
                <span></span>
              </label>
            </div>
            <div className="w-1/2 flex">
              <StaggeredDropdown
                header="Select image size"
                option={imageSize}
                setOption={setImageSize}
                dalleVersion={dalleVersion}
              />
            </div>
          </div>
          <div className="p-6 flex">
            <div className="w-1/2 flex">
              <p className="w-40 block h-7 text-sm font-medium text-gray-900">
                Regenerate caption
              </p>
              <label htmlFor="toggleRegenCaption">
                <input
                  type="checkbox"
                  id="toggleRegenCaption"
                  className="cursor-pointer h-8 w-16 rounded-full appearance-none bg-red bg-opacity-20 border-mainDark checked:bg-main checked:bg-opacity-20 transition duration-200 relative"
                  checked={regenCaptionRequired}
                  onChange={() =>
                    setRegenCaptionRequired(!regenCaptionRequired)
                  }
                />
                <span></span>
              </label>
            </div>
            <div className="w-1/2 flex">
              <p className="w-40 block h-7 text-sm font-medium text-gray-900">
                Regenerate keywords
              </p>
              <label htmlFor="toggleRegenKeywords">
                <input
                  type="checkbox"
                  id="toggleRegenKeywords"
                  className="cursor-pointer h-8 w-16 rounded-full appearance-none bg-red bg-opacity-20 border-mainDark checked:bg-main checked:bg-opacity-20 transition duration-200 relative"
                  checked={regenKeywordsRequired}
                  onChange={() =>
                    setRegenKeywordsRequired(!regenKeywordsRequired)
                  }
                />
                <span></span>
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={regenerateImg}
            className="text-black bg-main hover:bg-mainDark font-medium rounded-md text-sm w-64 px-5 py-2.5 my-4 text-center mx-auto block"
          >
            Regenerate CreAition
          </button>
        </Modal>
        <Modal
          isVisible={showUpgradePlanModal}
          onClose={() => setShowUpgradePlanModal(false)}
        >
          <div className="p-6 lg:px-8 text-left">
            <h1 className="font-extrabold text-[32px]">Oops!</h1>
            <p className="mt-2 text-[#666e75] text-[16px] flex items-center">
              Looks like you've run out of image generations on your current
              plan. Upgrade your plan to create more stunning CreAItions!
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
      </section>
    </>
  );
};

export default Create;
