import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAuth, updatePassword, signOut } from 'firebase/auth';
import { app } from '../../firebase';
import Navbar from '../components/Navbar';
import PageLoader from '../components/PageLoader';
import FormField from '../components/FormField';
import LoaderBlack from '../components/LoaderBlack';
import { confirmUserEmail, deleteAccount } from '../requests/auth';

const Account = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { token, _id } = useSelector((state) => state.user) || {};

  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      toast.error('Please enter a valid email');
      return;
    }
    if (
      password.length < 6 ||
      !/\d/.test(password) ||
      !/[a-zA-Z]/.test(password)
    ) {
      toast.error(
        'Password must be at least 6 characters and contain letters and numbers.'
      );
      setIsLoading(false);
      return;
    }
    if (password !== newPassword) {
      toast.error('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const normalizedEmail = email.toLowerCase();
      await confirmUserEmail(token, _id, normalizedEmail).then(async (res) => {
        if (res.data.success) {
          const fbUser = auth.currentUser;
          await updatePassword(fbUser, password)
            .then(() => {
              setIsLoading(false);
              setEmail('');
              setPassword('');
              toast.success(`Your password has been successfully updated!`);
            })
            .catch((err) => {
              const errorCode = err.code;
              const errorMessage = err.message;
              console.error('errorMessage => ', errorMessage);
              setIsLoading(false);
              setEmail('');
              setPassword('');
              if (errorCode === 'auth/requires-recent-login') {
                toast.error(
                  'Recent sign-in is required. Please sign in again to proceed with the password update.'
                );
              } else {
                toast.error('An error occurred during password update.');
              }
            });
        } else {
          setIsLoading(false);
          toast.error(
            'Please enter the correct email associated with your account to proceed.'
          );
          console.error('Email verification failed');
        }
      });
    } catch (err) {
      setIsLoading(false);
      console.error('API request error: ', err);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email2)) {
      setIsDeleting(false);
      toast.error('Please enter a valid email');
      return;
    }

    try {
      const normalizedEmail = email2.toLowerCase();
      await confirmUserEmail(token, _id, normalizedEmail).then(async (res) => {
        if (res.data.success) {
          await deleteAccount(token, _id)
            .then(async (res) => {
              toast.success(
                'Your account has been successfully deleted. Thank you for being a part of our community. we hope to see you again soon.'
              );
              await signOut(auth);
              dispatch({
                type: 'LOGOUT',
                payload: null,
              });
              navigate('/');
              setIsDeleting(false);
            })
            .catch((err) => console.error(err));
        } else {
          setIsDeleting(false);
          toast.error(
            'Please enter the correct email associated with your account to proceed.'
          );
          console.error('Email verification failed');
        }
      });
    } catch (err) {
      setIsDeleting(false);
      console.error('API request error: ', err);
    }
  };

  if (!_id) {
    return <PageLoader />;
  }

  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto p-4">
        <h1 className="font-extrabold text-[32px]">My Account</h1>
        <p className="mt-2 text-[#666e75] text-[16px]">
          This is your personal space where you have full control over your
          account settings.
        </p>
        <h2 className="mt-10 font-extrabold text-[24px]">Update Password</h2>
        <p className="mt-2 text-[#666e75] text-[16px]">
          If you need to update your password for any reason, you can do so
          here. Follow the prompts to set a new, secure password.
        </p>
        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Enter email"
              type="email"
              placeholder="Enter the email associated with your account"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <FormField
              labelName="Update password"
              type="password"
              placeholder="********"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <FormField
              labelName="Confirm new password"
              type="password"
              placeholder="********"
              value={newPassword}
              handleChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-40 mt-3 text-black bg-main hover:bg-mainDark font-medium rounded-md text-sm px-5 py-2.5 text-center"
          >
            {isLoading ? <LoaderBlack /> : 'Update Password'}
          </button>
        </form>
        <h2 className="mt-10 font-extrabold text-[24px]">Delete Account</h2>
        <p className="mt-2 text-[#666e75] text-[16px]">
          Here, you have the option to permanently delete your account. Please
          keep in mind that this action is irreversible. Additionally, all your
          CreAItions will be shared with the public. We appreciate your
          understanding.
        </p>
        <form className="mt-8" onSubmit={handleDelete}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Confirm your email"
              type="email"
              placeholder="Enter the email associated with your account"
              value={email2}
              handleChange={(e) => setEmail2(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-40 mt-3 text-black bg-red hover:bg-redDark font-medium rounded-md text-sm px-5 py-2.5 text-center"
          >
            {isDeleting ? <LoaderBlack /> : 'Delete Account'}
          </button>
        </form>
      </section>
    </>
  );
};

export default Account;
